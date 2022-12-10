const { test, expect } = require('@playwright/test');
const fetch = require('node-fetch');
import { Selector, locator } from 'testcafe';

test('Check that database is connected to frontend', async () => {
    // Use the built-in `fetch` function to make a GET request to the server
    const response = await fetch('http://localhost:3001/list-users');
  
    // Use the `expect` function from the `@playwright/test` library to verify that the response is successful
    expect(response.ok).toBe(true);
});

test('test to see if page loads successfully with login', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/login');
    // await button.click();
    // await page.locator('#googleLogin').locator("#container", {name: "Sign in with Google"}).click();
    await page.getByRole('textbox', { name: 'Email or phone' }).fill('maschoe@nuevaschool.org');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('password', { name: 'Enter your password' }).fill('G00gl3m3m3z!');
    await page.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
    await page.goto('http://localhost:3000/');
  });

// test('Check to see validation of tokenId works', async () => {
//     const response = await fetch("http://localhost:3001/googleloginapi", {
//         method: "POST",
//         token:"eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzA2MDgyNDYsImF1ZCI6IjI0MDc3NDk5MDA0My1paHZzNHZncDV1b2hpbXJzcmZiY2lpZzFzdDE5NGE5bi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNTgzMjg2MzM3MjI5NDQ1MTgxNCIsImhkIjoibnVldmFzY2hvb2wub3JnIiwiZW1haWwiOiJtYXNjaG9lQG51ZXZhc2Nob29sLm9yZyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiIyNDA3NzQ5OTAwNDMtaWh2czR2Z3A1dW9oaW1yc3JmYmNpaWcxc3QxOTRhOW4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiTWFzb24gQ2hvZXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNi1JSzJsbnFlRjlJd2FQNEhzMGtnMWFtS2dpQWZYTGRhNkNqUmpYQT1zOTYtYyIsImdpdmVuX25hbWUiOiJNYXNvbiIsImZhbWlseV9uYW1lIjoiQ2hvZXkiLCJpYXQiOjE2NzA2MDg1NDYsImV4cCI6MTY3MDYxMjE0NiwianRpIjoiMThmNmU1N2I1OTE4YTBkOThiNjlmZGM3YTVhZmUxYzBhYTYzZmIwOSJ9.KBUvXn1rMYFjHLxrWeiXm6xACQWUmKintDj0-3q-w7XDXO4xTl_eVXTAW360CerclwLrsVd0NwkRQRLgDUgnNEclriC_Q_I9Zij7sRbJxtR8GipEt_l9GbJh-tJac2C9qzmzDrBFFu2kdsfEXt0EuvD6_iTuimGYm4UeBxZ5j8w89dTGTSRGXfd-RYEcuO7Pfa9rszDcrZvCNtdDM6Fa_8ggmozCIt2UsoGNK4xKwTFEiCWzcVxXpa8Uf8cEW4DSOojyNn8xIynaJQWTCo_hOYu--XJ9PsT9IXIth-ZuYoHV4yiaxOpDwI4LHgAWFkuGJa6sO3gQuVRpYro0CHObJA",
//         clientId:"240774990043-ihvs4vgp5uohimrsrfbciig1st194a9n.apps.googleusercontent.com"
//     })

//     expect(response.ok).toBe(true);

// })
