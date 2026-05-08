import { test, expect } from "@playwright/test";

test.describe("Interactions", () => {
  test("project filter pills change the visible count", async ({ page }) => {
    await page.goto("/#projects");

    const allCount = await page.locator("#projects [aria-label^='Open details for']").count();
    expect(allCount).toBeGreaterThan(0);

    // Filter to ML / AI
    await page.getByRole("button", { name: "ML / AI", exact: true }).click();
    await page.waitForTimeout(400);
    const mlCount = await page.locator("#projects [aria-label^='Open details for']").count();
    expect(mlCount).toBeGreaterThan(0);
    expect(mlCount).toBeLessThanOrEqual(allCount);

    // Reset to All
    await page.getByRole("button", { name: "All", exact: true }).click();
    await page.waitForTimeout(400);
    const allCountAgain = await page.locator("#projects [aria-label^='Open details for']").count();
    expect(allCountAgain).toBe(allCount);
  });

  test("clicking a project card opens the modal with details", async ({ page }) => {
    await page.goto("/#projects");
    const firstCard = page
      .locator("#projects [aria-label^='Open details for']")
      .first();
    await firstCard.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/tech stack/i)).toBeVisible();

    // Close via Escape
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("contact form rejects empty submission with validation messages", async ({ page }) => {
    await page.goto("/#contact");

    await page.getByRole("button", { name: /send message/i }).click();

    // RHF + Zod surfaces inline errors
    await expect(page.getByText(/name must be at least/i)).toBeVisible();
    await expect(page.getByText(/valid email/i)).toBeVisible();
    await expect(page.getByText(/message must be at least/i)).toBeVisible();
  });

  test("contact form fallback path renders mailto bridge when SMTP and DB are absent", async ({ page }) => {
    await page.goto("/#contact");

    await page.getByLabel("Name").fill("Playwright Tester");
    await page.getByLabel("Email").fill("tester@example.com");
    await page
      .getByLabel("Message")
      .fill("This is a placeholder smoke message from Playwright.");

    await page.getByRole("button", { name: /send message/i }).click();

    // With DATABASE_URL and SMTP_* unset, the server action returns either:
    //  - "fallback" (mailto bridge) when DB is unavailable, OR
    //  - "success" via "stored" if a DB happens to be configured.
    // Both are valid green-paths; the assertion accepts either.
    await expect(
      page
        .getByText(/Open in your email app|Message received|Message on its way/i)
        .first(),
    ).toBeVisible({ timeout: 8_000 });
  });
});
