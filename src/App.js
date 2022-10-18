// import logo from './logo.svg';
import './App.css';
import Club from './club';
import ChessClub from './index.js';
import SearchBar from './searchBar';
import getPosts from './api/axios.js';
import axios from 'axios'
import { useState, useEffect} from 'react';
import searchBar from './searchBar.js'
import ListPage from './ListPage.js'


// import List from "./Components/List"



// TO BE REPLACED BY FIREBASE CLUB ARRAY

// Array for all clubs
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
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])
  
  useEffect(() => {
    getPosts().then(json => {
      setPosts(json)
      return json
    }).then(json => {
      setSearchResults(json)
    })
  }, [])

  return (
    <div className="App">
      <SearchBar posts={posts} setSearchResults={setSearchResults}/>
      <ListPage searchResults={searchResults} />
      {/* <div class="Button">
        <button type="button">Register a club</button>
      </div>

      <h1>List of clubs:</h1>
      <ul>{listItems}</ul> */}
    </div>
  );
}

export default App;
