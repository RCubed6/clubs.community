const { test, expect } = require('@playwright/test');

test('localhost has correct links to resources', async ({ page }) => {
  
    // Goes to localhost:3000/
    await page.goto('localhost:3000/');

    // Add test to ensure that relevent information comes up for the modal of a club
    

});
  