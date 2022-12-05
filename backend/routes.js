const express = require('express')
const router = express.Router()
const ClubSchema = require('./Club')
const { auth } = require('google-auth-library');
const { google } = require('googleapis');

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

// getting sheets data
router.get('/', async (req, res) => {
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

router.get('/list-clubs', (req, res) => {
    ClubSchema.find({
    })
    .then(clubs => {
      console.log(clubs)
    //   res.send(response.data)
      res.json(clubs)
    })
    .catch(err => {
      console.error(err)
    })
})

router.post('/new-club', (req, res) => {
    ClubSchema.create({name: req.body.name, description: req.body.description})
        .then(club => {
          console.log("Club succesfully created!")
          res.json("New Club Created!")
        })
        .catch(err => {
          console.error(err)
          res.json({error: err, message: "Error in NEW CLUB"})
        })
})

router.delete('/delete-club', (req, res) => {
    ClubSchema.deleteOne({name: req.body.name})
    .then(club => {
      console.log("deleting the club by the name of " + req.body.name)
      res.json(club)
    })
    .catch(err => {
      console.error(err)
    })
})

router.put('/edit-club', (req, res) => {
    ClubSchema.updateOne(
      {name: req.body.name}, {owner: req.body.newOwner}
    )
    .then(club => {
      console.log(json(club))
    })
})

module.exports = router;