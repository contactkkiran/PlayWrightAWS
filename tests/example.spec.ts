import { test, expect, firefox, type Page, Browser } from "@playwright/test";

// Run tests on Firefox with headless false
test.use({ browserName: "firefox" });

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

const TO_DO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctor's appointment",
] as const;

test.describe("To Do", () => {
  test("should allow me to add todo items", async ({ page }) => {
    const todo = await page.getByPlaceholder("What needs to be done?");
    await todo.fill(TO_DO_ITEMS[0]);
    await todo.press("Enter");
    expect(await page.getByTestId("todo-title")).toHaveText(TO_DO_ITEMS[0]);

    await todo.fill(TO_DO_ITEMS[1]);
    await todo.press("Enter");
    expect(page.getByTestId("todo-title")).toHaveText([
      TO_DO_ITEMS[0],
      TO_DO_ITEMS[1],
    ]);
  });
});

// Reference Tests
test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("test search", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page.locator("button.DocSearch")).toBeVisible();
});
