import { test, expect, type Page } from "@playwright/test";

// Force the test to run in Firefox with a visible UI (headed mode)
test.use({ browserName: "firefox", headless: false });

const TO_DO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
] as const;

test.describe("To Do", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
  });

  test("should allow me to add todo items", async ({ page }) => {
    const todo = await page.getByPlaceholder("What needs to be done?");

    await todo.fill(TO_DO_ITEMS[0]);
    await todo.press("Enter");
    await expect(page.getByTestId("todo-title")).toHaveText(TO_DO_ITEMS[0]);
    await todo.fill(TO_DO_ITEMS[1]);
    await todo.press("Enter");
    await expect(page.getByTestId("todo-title")).toHaveText([
      TO_DO_ITEMS[0],
      TO_DO_ITEMS[1],
    ]);
  });
});
