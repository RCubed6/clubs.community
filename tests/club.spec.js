const { test, expect } = require('@playwright/test');

test('localhost has correct links to resources', async ({ page }) => {
  
    // Goes to localhost:3000/
    await page.goto('localhost:3000/');

    // TODO: add test to ensure the club card system works

    

});
  