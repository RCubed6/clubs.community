const express= require('express');
const { auth } = require('google-auth-library');
const { google } = require('googleapis');

const app = express()
app.use(express.json())

app.listen(3001, () => console.log("Server running on PORT 3001!"))

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
const id = '1FTNCQPGhSERO_oQ8z8TT_UdTonAdbt4hOKaCDTROBcY';

app.get('/', async (req, res) => {
    try {
        const { sheets } = await authentication();

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: id,
            range: "Sheet6",
        })
        res.send(response.data)
        } catch(e) {
            console.log(e);
            res.status(500).send();
        }
});
