// @ts-check
const { test, expect } = require('@playwright/test');

test('localhost has correct links to resources', async ({ page }) => {
  
  // Goes to localhost:3000/
  await page.goto('localhost:3000/');

  // create a locator
  const Guidlines = page.getByRole('link', { name: 'Clubs Guidelines' });
  // use the locator to click the element
  await Guidlines.click();
  // check that the locator going to the correct page
  await expect(page.url()).toBe('https://docs.google.com/document/d/1UPBjlHAmMsutsL9CanyyLAroq7_CjUQGBO-5YGY2tTI/edit');
  
  // Returns to localhost:3000/
  await page.goto('localhost:3000/');

  // create a locator
  const funding = page.getByRole('link', { name: 'Clubs Funding Application' });
  // use the locator to click the element
  await funding.click();
  // check that the locator going to the correct page (google forms first redirects to this page:)
  await expect(page).toHaveURL(new RegExp('^https://accounts.google.com/v3/signin/'));

  // Returns to localhost:3000/
  await page.goto('localhost:3000/');

  // create a locator
  const creation = page.getByRole('link', { name: 'Clubs Creation Application' });
  // use the locator to click the element
  await creation.click();
  // check that the locator going to the correct page (google forms first redirects to this page:)
  await expect(page).toHaveURL(new RegExp('^https://accounts.google.com/v3/signin/'));
});
