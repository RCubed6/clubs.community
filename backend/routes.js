const express = require('express')
const router = express.Router()
const { Clubs, Users } = require('./Club')
const { OAuth2Client } = require('google-auth-library');
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

router.post("/googleloginapi", async (req, res) => {
  const token = req.body.token;
  const clientId = req.body.clientId;
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({
      idToken: token,
      // idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzA0NzM1MzAsImF1ZCI6IjI0MDc3NDk5MDA0My1paHZzNHZncDV1b2hpbXJzcmZiY2lpZzFzdDE5NGE5bi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNTgzMjg2MzM3MjI5NDQ1MTgxNCIsImhkIjoibnVldmFzY2hvb2wub3JnIiwiZW1haWwiOiJtYXNjaG9lQG51ZXZhc2Nob29sLm9yZyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiIyNDA3NzQ5OTAwNDMtaWh2czR2Z3A1dW9oaW1yc3JmYmNpaWcxc3QxOTRhOW4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiTWFzb24gQ2hvZXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNi1JSzJsbnFlRjlJd2FQNEhzMGtnMWFtS2dpQWZYTGRhNkNqUmpYQT1zOTYtYyIsImdpdmVuX25hbWUiOiJNYXNvbiIsImZhbWlseV9uYW1lIjoiQ2hvZXkiLCJpYXQiOjE2NzA0NzM4MzAsImV4cCI6MTY3MDQ3NzQzMCwianRpIjoiZjM3YzM1OTVkMTkzYTE4YzM2MzliZTQ1YTFkZDBiNzQ0NTUxOGU2YiJ9.kbq6aaFPf_663GCE9MVxoFsFXyVv3APXys6lrBwC-rnxvI4Btl1w8zbIqy9MMSD-w2ZuPcWgWHPuIl_yLv0GNIw5RKaUMQHLbMTUjzMEBPZe7yr4N8Nxu_gD0X6OnWk4iUNIzfkxn95_TxA4vchT2GkdaIityVhO2gEYwG4l3kjCaHlmiW_ViKwIDplyTu0bScdcCPhfYq5ev9fTigHF_0_UAa9IbpBNvMLtK8budFYWH2CP-9Lp77ItE39UCxsuk5bbd2tDxswrKy8ozuSYt5JPQnaeKeradrl2Req18nSKyGXO-k5iZHouhr_J7URekHcAZ0p3W2Zeg2-XTg9CWw",
      audience: clientId
  });
  const { name, email, picture } = ticket.getPayload();    
  const user = { 
    name: name, 
    email: email,
    picture: picture
  }
  if (user.email.includes("nuevaschool.org")){
    Users.updateOne({
      name: user.name,
      email: user.email,
      picture: user.picture
    })
    res.status(201)
    res.json(user)
  } else {
    res.json("Only nuevaschool.org emails are accepted");
  }
})

router.get('/list-users', async (req, res) => {
  Users.find({
  })
  .then(user => {
    console.log(user)
    res.json(user)
  })
  .catch(err => {
    console.error(err)
  })
})

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
    Clubs.find({
    })
    .then(clubs => {
      console.log(clubs)
      res.json(clubs)
    })
    .catch(err => {
      console.error(err)
    })
})

router.post('/new-club', (req, res) => {
    let club = new Clubs({name: req.body.name, description: req.body.description});
    club.save()
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
    Clubs.deleteOne({name: req.body.name})
    .then(club => {
      console.log("deleting the club by the name of " + req.body.name)
      res.json(club)
    })
    .catch(err => {
      console.error(err)
    })
})

router.put('/edit-club', (req, res) => {
    Clubs.updateOne(
      {name: req.body.name}, {owner: req.body.newOwner}
    )
    .then(club => {
      console.log(json(club))
    })
})

module.exports = router;