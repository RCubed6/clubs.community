//requires necessary libraries
const express = require('express');
const database = require('./database');
const routes = require('./routes');
const bodyParser = require('body-parser')
const cors = require('cors')

//uses express js
const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())
//moved all API stuff to routes/routes.js
app.use(routes)
//setting the backend to port 3001, and printing to console once that's done
app.listen(port, () => console.log("Clubs.community running on PORT 3001!"))
