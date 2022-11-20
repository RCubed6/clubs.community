// TODO figure out where I need the following
// Import the functions you need from the SDKs you need
// const { initializeApp } = require("firebase/app");
// //import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// const { getAuth } = require("firebase/auth")

//const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDFvH4CTR0jSeblHhVZHx9CvunNxGBgfX8",
//   authDomain: "clubs-community-be504.firebaseapp.com",
//   projectId: "clubs-community-be504",
//   storageBucket: "clubs-community-be504.appspot.com",
//   messagingSenderId: "34171441682",
//   appId: "1:34171441682:web:7096c5477a95391d9d3ecb",
//   measurementId: "G-R13RYWN08G"
// };

// const fbapp = initializeApp(firebaseConfig)
//const analytics = getAnalytics(fbapp);



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
const id = '1v5bPd15CF4-j6HHWqeaNaF24uBetCW8xsky1spyh2IY';

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
