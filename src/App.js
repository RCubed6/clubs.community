// import logo from './logo.svg';
import './App.css';
import Club from './club';
import ChessClub from './index.js'
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

// TO BE REPLACED BY FIREBASE CLUB ARRAY


// Initialize Array for all clubs
let clublist = [];

// // Add new club to array
clublist.push(new Club('Team', 'Chess', 'Chess', '340', '3:15-4'), new Club('Art', 'Art Club', '', '1204', '3:15-4'));

// // make function for returning the names for all clubs in the clubs list
function getclubnames(array) {
  let clubnamelist = [];
  for (let i = 0; i < array.length; i++) {
    clubnamelist[i] = array[i].name;
  }
  return clubnamelist;
}


// Returns html <li> tags to render the list of clubs
const listItems = getclubnames(clublist).map((club) =>
  <li key={club}>{club}</li>
);

console.log(listItems);
// console.log(ChessClub.name);

function App() {
    React.useEffect(() => {
      axios.get("http://localhost:3001").then((response) => {
        console.log(response.data)
      });
    }, []);
  
  //    .then((response) => console.log(response.json()));
  //  }, []);
   
  return (
    <div className="App">
      <header className="App-header">
        <h1>List of clubs:</h1>
        <ul>{listItems}</ul>
        {/* <li>{getclubnames(clublist)}</li> */}
        {/* <li>{ChessClub.get_name}</li> */}

      </header>
    </div>
  );
}

export default App;
