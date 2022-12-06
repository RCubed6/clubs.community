// Influenced by OpenAI (but significantly modified)
const { test, expect } = require('@playwright/test');

test('Club modal displays correct information', async ({ page }) => {
  // Navigate to the page containing the modals
  await page.goto('http://localhost:3000/')

  // Use the page's built-in `waitForSelector` function to wait until the club card is visible on the page
  await page.waitForSelector('.clubs')

  // Use the page's built-in `click` function to click on the club card
  const clubCard = await page.$('.clubs')
  await clubCard.click()

  // Use the page's built-in `waitForSelector` function to wait until the club modal is visible on the page
  await page.waitForSelector('.modal')

  // Use the `expect` function from the `@playwright/test` library to verify that the club modal is rendered correctly and contains the correct information
  const clubModal = await page.$('.modal')
  expect(clubModal).toBeTruthy()

  // Verify that the club description and name exists on the modal
  const clubDescription = await clubModal.$eval('.card-expand', (el) => el.innerText)
  expect(clubDescription).toBeTruthy()

  // Verify that the club leads and club advisor exist on the modal
  const clubAdvisor = await clubModal.$eval('.card-expand-leads', (el) => el.innerText)
  expect(clubAdvisor).toBeTruthy()
})