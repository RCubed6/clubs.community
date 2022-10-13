//requires necessary libraries
const express= require('express');
const { auth } = require('google-auth-library');
const { google } = require('googleapis');

//uses express js
const app = express()
app.use(express.json())

//setting the backend to port 3001, and printing to console once that's done
app.listen(3001, () => console.log("Server running on PORT 3001!"))

//authenticates to get access to the google spreadsheet with clubs data
const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        //credentials to get access to spreadsheet
        keyFile: "credentials.json",
        //api
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    //doing authentication
    const client = await auth.getClient();

    const sheets = google.sheets({
        version: 'v4',
        auth: client
    })
    return { sheets }
}
//google sheets id (everything after /d/ and before /)
const id = '1FTNCQPGhSERO_oQ8z8TT_UdTonAdbt4hOKaCDTROBcY';

//getting sheets data
app.get('/', async (req, res) => {
    try {
        //setting access settings so frontend can access
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        const { sheets } = await authentication();
        
        //getting spreadsheet values
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: id,
            range: "Sheet6",
        })
        //send spreadsheet data
        res.send(response.data)
        
        //error handling
        } catch(e) {
            console.log(e);
            res.status(500).send();
        }
});
