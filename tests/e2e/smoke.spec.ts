import { test, expect } from "@playwright/test";

/**
 * High-level smoke test — fails loudly if the site doesn't render at all.
 * Runs on every viewport project; the assertions inside don't depend on
 * viewport-specific layout (those live in responsive.spec.ts).
 */
test.describe("Landing page smoke", () => {
  test("renders without console errors and shows the owner name", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const txt = msg.text();
        // Ignore noisy framework warnings / dev-only chatter
        if (
          txt.includes("Failed to load resource") ||
          txt.includes("Download the React DevTools") ||
          txt.includes("[Fast Refresh]")
        ) {
          return;
        }
        errors.push(`console.error: ${txt}`);
      }
    });

    await page.goto("/");
    await expect(page).toHaveTitle(/Huda Zahra/);

    // Headline is in an sr-only span (the visible one is animated word-by-word
    // and split across spans), so we assert by accessible text.
    await expect(
      page.getByRole("heading", { level: 1, name: /Huda Zahra/ }),
    ).toBeVisible();

    // Wait for animations to settle, then check no console errors fired
    await page.waitForTimeout(800);
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("all primary sections are reachable via in-page anchors", async ({
    page,
  }) => {
    await page.goto("/");
    const ids = ["about", "skills", "projects", "experience", "education", "contact"];
    for (const id of ids) {
      const section = page.locator(`#${id}`);
      await expect(section, `section #${id} should exist`).toHaveCount(1);
    }
  });

  test("skip-to-content link is accessible via keyboard", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to content/i });
    await expect(skip).toBeFocused();
  });

  test("opengraph image route returns a PNG", async ({ request }) => {
    const res = await request.get("/opengraph-image");
    expect(res.ok()).toBeTruthy();
    expect(res.headers()["content-type"]).toContain("image/png");
  });

  test("robots.txt and sitemap.xml are served", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("Sitemap");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain("<urlset");
  });
});
