const { test, expect } = require('@playwright/test')

test('Club cards render correctly (makes sure the backend is running)', async ({ page }) => {
  // Navigate to the page containing the club card
  await page.goto('http://localhost:3000/');

  // Use the page's built-in `waitForSelector` function to wait until the club card is visible on the page
  await page.waitForSelector('.clubs');

  // Use the `expect` function from the `@playwright/test` library to verify that the club card is rendered correctly
  const clubCard = await page.$('.clubs');
  expect(clubCard).toBeTruthy();
})
  