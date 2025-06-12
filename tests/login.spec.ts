import { test, expect, type Page, firefox } from "@playwright/test";
test.use({ browserName: "firefox", headless: false });

test.describe("Login Test", () => {
  test.beforeEach("Login test", async ({ page }) => {
    await page.goto(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
    );
  });

  test("verify page launch", async ({ page }) => {
    await expect(page).toHaveTitle("Account Login");
  });

  test("Login Test", async ({ page }) => {
    const email = await await page.getByPlaceholder("E-Mail Address");
    await email.fill("Kirankkanumuri@outlook.com");

    const password = await page.getByPlaceholder("Password");
    await password.fill("Varma@143");

    const loginButton = await page.locator(
      "//input[@type='submit' and @value='Login']"
    );
    await loginButton.click();
  });
});
