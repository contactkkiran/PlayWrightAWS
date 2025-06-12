import { test, expect } from "@playwright/test";
test("Verify title", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(
    "Fast and reliable end-to-end testing for modern web apps | Playwright"
  );
});

test("Click get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await page.getByRole("link", { name: "Get started" }).click();
  await page.getByRole("heading", { name: "Installation" }).isVisible;
});

test("desc", async ({ page }) => {});

test("Desc1", async ({ page }) => {});
test("Desc", async ({ page }) => {});
