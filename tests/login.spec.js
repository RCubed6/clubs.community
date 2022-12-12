const { test, expect } = require('@playwright/test');
const fetch = require('node-fetch');

//check if database is connected
test('Check that database is connected to frontend', async () => {
    // Use the built-in `fetch` function to make a GET request to the server
    const response = await fetch('http://localhost:3001/list-users');
  
    // Use the `expect` function from the `@playwright/test` library to verify that the response is successful
    expect(response.ok).toBe(true);
});

//check if login pages work
test('test to see if page loads successfully with login', async ({browser}) => {
    //create a new "fake" browser context
    const context = await browser.newContext();
    //create a new page, and navigate to login window
    const page = await context.newPage();
    await page.goto('http://localhost:3000/login');
    //click on the google button, expecting a popup
    const [popup] = await Promise.all([
        //turn on popup event listener
        page.waitForEvent('popup'),
        //click the button
        page.locator('#googleButton div').nth(1).click()
    ]);
    //wait for popup to load
    await popup.waitForLoadState();

    await Promise.all ([
        //enter username, and password
        await popup.getByRole('textbox', { name: 'Email or phone' }).fill('maschoe@nuevaschool.org'),
        await popup.getByRole('button', { name: 'Next' }).click()
    ]);
    
    //enter password, press enter
    await popup.getByRole('textbox', { name: 'Enter your password' }).fill('G00gl3m3m3z!');
    await popup.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
    
    await popup.goto('http://localhost:3000/');
    await context.close();
  });
