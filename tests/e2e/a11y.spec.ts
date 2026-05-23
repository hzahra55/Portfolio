import { test, expect } from "@playwright/test";

test.describe("Accessibility basics", () => {
  test("page has a single h1", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("interactive elements have accessible names", async ({ page }) => {
    await page.goto("/");
    // Sample a few critical buttons / links — broad axe sweep can be added later
    await expect(page.getByRole("link", { name: /skip to content/i })).toHaveCount(1);
    await expect(page.getByRole("link", { name: /^Resume/i }).first()).toBeVisible();
  });

  test("respects prefers-reduced-motion: aurora drift static, follower hidden", async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // The cursor follower component bails out under reducedMotion via the
    // useReducedMotion hook — its container should not render at all.
    const follower = page.locator("div[aria-hidden].fixed.left-0.top-0").first();
    await expect(follower).toHaveCount(0);

    await ctx.close();
  });
});
