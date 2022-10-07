const express= require('express');
const { auth } = require('google-auth-library');
const { google } = require('googleapis');

const app = express()
app.use(express.json())

app.listen(3000, () => console.log("Server running on PORT 3000!"))

const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    const client = await auth.getClient();

    const sheets = google.sheets({
        version: 'v4',
        auth: client
    })
    return { sheets }
}
const id = '1NQETrPPD77ffH3qY62ek5N2gKsXJ0BfpK_DBqsiuOik';

app.get('/', async (req, res) => {
    try {
        const { sheets } = await authentication();

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: id,
            range: "Sheet1",
        })
        res.send(response.data)
        } catch(e) {
            console.log(e);
            res.status(500).send();
        }
});
