import { test, expect } from "@playwright/test";

test.use({ browserName: "firefox", headless: false });

test("Fetch and click on any search suggestion dynamically", async ({
  page,
}) => {
  await page.goto("https://www.flipkart.com/");

  // Close login popup if it appears
  const loginPopup = page.locator("button:has-text('✕')");
  if (await loginPopup.isVisible()) {
    await loginPopup.click();
  }

  // Define the search term dynamically
  const searchTerm = "samsung"; // Change this as needed

  // Type search term in the search bar
  await page
    .getByPlaceholder("Search for Products, Brands and More")
    .fill(searchTerm);

  // Wait for search suggestions to appear
  await page.waitForTimeout(3000);

  // Get all search suggestions
  const suggestions = page.locator("li, div[role='option']");
  const suggestionTexts = await suggestions.allTextContents();

  console.log(`Available Search Suggestions:`, suggestionTexts);

  // Choose which search result to click:
  const searchIndex = 2; // Change this value to select different search results
  const searchText = ""; // Set this to a specific option if you want to click by text (e.g., "samsung s24 ultra")

  let clicked = false;

  if (searchText) {
    // Click by exact text match if provided
    const suggestionToClick = page.locator(
      `li:has-text("${searchText}"), div[role='option']:has-text("${searchText}")`
    );

    if ((await suggestionToClick.count()) > 0) {
      await suggestionToClick.first().click();
      console.log(`Clicked on search suggestion: "${searchText}"`);
      clicked = true;
    } else {
      console.warn(`No search suggestion found with text: "${searchText}"`);
    }
  }

  // Click by index if no text match is provided
  if (!clicked && searchIndex >= 0) {
    const count = await suggestions.count();
    if (count > searchIndex) {
      await suggestions.nth(searchIndex).click();
      console.log(
        `Clicked on search suggestion at index ${searchIndex}: "${suggestionTexts[searchIndex]}"`
      );
      clicked = true;
    } else {
      console.warn(
        `Invalid search index: ${searchIndex}. Only ${count} suggestions available.`
      );
    }
  }

  if (!clicked) {
    throw new Error("No valid search suggestion clicked!");
  }

  // Verify navigation to the search results page
  await page.waitForURL(/search\?q=/);
  expect(page.url()).toContain(searchTerm);

  // Extract list items (li values) from the search results page
  await page.waitForSelector("ul li");
  const specsList = await page.locator("ul li").allTextContents();

  // Print extracted specs
  specsList.forEach((spec, index) => {
    console.log(`li(${index + 1}): ${spec}`);
  });
});
