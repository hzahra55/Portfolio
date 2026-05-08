import { test, expect } from "@playwright/test";

/**
 * Viewport-aware behavioural checks.
 *
 * Each Playwright project (mobile, tablet, desktop, ultrawide) has its own
 * viewport; assertions branch on `project.name` to verify the right
 * variant of the UI is shown.
 */

test.describe("Responsive layout", () => {
  test("navbar exposes the right controls per viewport", async ({
    page,
  }, testInfo) => {
    await page.goto("/");

    const isMobile = testInfo.project.name === "mobile";

    const mobileTrigger = page.getByRole("button", { name: /open menu/i });
    const desktopResume = page.getByRole("link", { name: /^Resume/ }).first();

    if (isMobile) {
      await expect(mobileTrigger).toBeVisible();
    } else {
      await expect(mobileTrigger).toBeHidden();
      await expect(desktopResume).toBeVisible();
    }
  });

  test("mobile drawer opens and exposes nav links", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "mobile",
      "drawer is mobile-only chrome",
    );

    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();

    for (const label of ["About", "Skills", "Work", "Experience", "Contact"]) {
      await expect(
        page.getByRole("link", { name: label }).first(),
      ).toBeVisible();
    }

    await page.getByRole("button", { name: /close menu/i }).click();
  });

  test("hero stat cluster is visible only on lg+ viewports", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    const stat = page.getByText("Years exploring ML").first();

    // The stat cluster is hidden on mobile + tablet (lg breakpoint = 1024px)
    if (
      testInfo.project.name === "desktop" ||
      testInfo.project.name === "ultrawide"
    ) {
      await expect(stat).toBeVisible();
    } else {
      // Hidden via CSS (display:none) — not in the rendered tree visually
      await expect(stat).toBeHidden();
    }
  });

  test("hero CTAs stay clickable and don't overflow the viewport", async ({
    page,
  }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /view work/i });
    await expect(cta).toBeVisible();

    const box = await cta.boundingBox();
    const vp = page.viewportSize();
    expect(box, "cta should have layout box").not.toBeNull();
    expect(vp).not.toBeNull();
    if (box && vp) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(vp.width + 1); // +1 for sub-pixel tolerance
    }
  });
});

test.describe("Visual snapshots", () => {
  /**
   * Per-viewport full-page screenshots. These aren't compared against
   * baselines (we don't ship a baseline yet) — they're just attached to the
   * Playwright report so a human can scan responsive output in one place.
   *
   * Run `npm run test:e2e:report` after a run to view them.
   */
  test("captures full-page screenshot for review", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.evaluate(() => {
      // Pause aurora drift / cursor follower for stable shots
      document.documentElement.style.setProperty("--grain-opacity", "0");
    });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);
    const png = await page.screenshot({ fullPage: true, animations: "disabled" });
    await testInfo.attach(`landing-${testInfo.project.name}.png`, {
      body: png,
      contentType: "image/png",
    });
  });
});
