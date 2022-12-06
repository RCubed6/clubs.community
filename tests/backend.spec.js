const { test, expect } = require('@playwright/test');
const fetch = require('node-fetch');

test('Ensures correct data from Google Sheets', async () => {
  // Use the built-in `fetch` function to make a GET request to the server
  const response = await fetch('http://localhost:3001');

  // Use the `expect` function from the `@playwright/test` library to verify that the response is successful
  expect(response.ok).toBe(true);

  // Convert the response to JSON
  const data = await response.json();

  // Use the `expect` function to verify that the response contains the expected data from the Google Sheets spreadsheet
  expect(data.values[0]).toEqual(['Renewing or Creating', 'Name (first and last)', "What is the name of your club?", "Who is your club advisor?", "What is the name(s) of the clubs leader(s)?", "What is the email address of the clubs leader(s)?", "Please give a short description of your club. This will be on the Nueva website. Please DO NOT include specific meetings times or details that are only relevant to Nueva students/club members. (roughly 100 words) ", "Categories:"])
});