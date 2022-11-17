import './main.css'
import axios from "axios";
import React from "react";
import {Club} from './Club.js';
import { render } from '@testing-library/react';
/**
 * Entrypoint component for App 
 */


 
function App() {

  // Component State
  const [clubs, setClubs] = React.useState([])
  const [filteredClubs, setFilteredClubs] = React.useState([])
  // popup club description
  const [selectedClubDesc, setSelectedClubDesc] = React.useState(undefined)
  // popup club email
  const [selectedClubMail, setSelectedClubMail] = React.useState(undefined)
  // popup club advisor
  const [selectedClubAdv, setSelectedClubAdv] = React.useState(undefined)
  // popup club leader(s)
  const [selectedClubLead, setSelectedClubLead] = React.useState(undefined)
  // popup club email
  const [selectedClubName, setSelectedClubName] = React.useState(undefined)
  // popup club advisor
  const [selectedClubTags, setSelectedClubTags] = React.useState(undefined)
  // modal boolean state
  const [showModal, setShowModal] = React.useState(false)
  


  // const the_button = document.querySelector(".js-btn")
  // const modal = document.querySelector(".modal")
  // Hook for disabling club div onclick
  const [disable, setDisable] = React.useState(false);

  const dialog = document.querySelector("dialog");
  // const club = document.querySelector(".clubs");

  // const closeSpan = document.querySelector(".close")

  /**
   * Get list of Clubs from API
   */
  React.useEffect(() => {
    axios.get("http://localhost:3001")
      .then((response) => {
        console.log(response);
        const results = response.data.values;
        results.splice(0, 1);
        let newResults = [];
        for(let i = 0; i < results.length; i++){
          let newClub = new Club(results[i][2], results[i][4], results[i][3], results[i][5], results[i][6], results[i][7]);
          newResults.push(newClub);
        }
        console.log("newResults");
        console.log(newResults);
        setClubs(newResults);
        setFilteredClubs(newResults);
      })
  }, []);

  /**
   * Callback to handle typing (onChange) of the
   * search inpout field
   */
  const handleSearch = (event) => {
    const search = event.target.value
    if (search) {
      setFilteredClubs(clubs.filter((club) =>
        club.name.toLowerCase().includes(search.toLowerCase())
        || club.teachers.toLowerCase().includes(search.toLowerCase())
        || club.leads.toLowerCase().includes(search.toLowerCase())))
        
      console.log("Clubs:")
      console.log(clubs);
    } else {
      console.log("Clubs:")
      setFilteredClubs(clubs)
    }
  }
  // {/* For category button */}
  const handleClick = (event) => {
    const search = event.target.value
    if (search) {
      setFilteredClubs(clubs.filter((club) => 
      club.categories.toLowerCase().includes(search.toLowerCase())))
    } else {
      setFilteredClubs(clubs)
    }
  }

  // console.log(filteredClubs)

// Activates Modal popup
const createModal = (i) => {
  console.log("Open Modal");
  console.log(i);
  setSelectedClubDesc(i.description);
  setSelectedClubMail(i.emails);
  setSelectedClubAdv(i.teachers);
  setSelectedClubLead(i.leads);
  setSelectedClubName(i.name);
  setSelectedClubTags(i.categories);
  setDisable(true);
  setShowModal(true);
}


// Deactivates Modal popup

const closeModal = () => {
  console.log("Close Modal")
}

  return (
    <div className="">
      {/* Renders search bar and clubs */}
      <div className='Main'>
        {/* Header */}
        <div className="grid-body">
          <div className="grid-container">
            <div className="box1">
              <img id="logo" src="nueva.png"/>
              <span>The Nueva School</span>
            </div>
            <div className="box2">
              <img id="club" src="club1.jpg"/>
            </div>
            <div className="box2">
              <img id="club" src="club2.jpg"/>
            </div>
            <div className="box4"></div>
          </div>
      </div>
        {/* Search bar */}
          <input onChange={handleSearch} type="text" placeholder="Search for clubs and people..." />
          {/* Clubs */}
          <div className="container">
            {filteredClubs.map((club, index) => (
              // creating div for each club
              <div key={index} className="clubs" disabled={false} onClick={() => createModal(club)}>
              {/* rendering club objects */}
              <h2 className="card-header">{club.name}</h2>
              <p className="card-leads">{club.leads}</p>
              <p className="card-body">{club.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* rendering popup */}
      { showModal && (
        <React.Fragment>
          <div className='modal-backdrop' onClick={() => setShowModal(false)}></div>
          <div className="modal">
            <h2 className="card-expand-header">{selectedClubName}</h2>
            <p className="card-expand-leads">Lead(s): {selectedClubLead}  ({selectedClubMail})</p>
            <p className="card-expand-leads">Faculty Advisor(s): {selectedClubAdv}</p>
            <p className="card-expand">Description: {selectedClubDesc}</p>
            <p className="card-expand">Categories: {selectedClubTags}</p>
            
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
          </div>
        </React.Fragment>
      )}
      {/* Prints category buttons to sort clubs by category */}
      <div className="Categories-bucket">
        {/* Category element header */}
        <h1>Categories:</h1>
        {/* Buttons; when clicked they activate the constant handleClick with a given value, and the program sorts the clubs by that value*/}
        <button className="Categories" onClick={handleClick} value={""}>
          All Categories
        </button>
        <button className="Categories" onClick={handleClick} value={"Academic"}>
          Academic
        </button>
        <button className="Categories"  onClick={handleClick} value={"Activism"}>
          Activism
        </button>
        <button className="Categories"  onClick={handleClick} value={"Affinity Group"}>
          Affinity Groups
        </button>
        <button className="Categories"  onClick={handleClick} value={"Community Service"}>
          Community Service
        </button>
        <button className="Categories"  onClick={handleClick} value={"Hobbies & Interests"}>
          Hobbies & Interests
        </button>
        <button className="Categories"  onClick={handleClick} value={"Language & Culture"}>
          Language & Culture
        </button>
        <button className="Categories"  onClick={handleClick} value={"Sports & Fitness"}>
          Sports & Fitness
        </button>
        <button className="Categories"  onClick={handleClick} value={"STEM"}>
          STEM
        </button>
        <button className="Categories"  onClick={handleClick} value={"Visual & Performing Arts"}>
          Visual & Performing Arts
        </button>
        <button className="Categories"  onClick={handleClick} value={"Writing & Literature"}>
          Writing & Literature
        </button>
      </div>
      <div className='Categories-bucket'>
        {/* Resource element header */}
        <h1>More Resources:</h1>

        {/* Each button is wrapped by an a tag which means when the button is clicked it will activate the link */}
        <a className='Categories' className ="card-leads" href="https://docs.google.com/forms/d/e/1FAIpQLSc1Z3Uc_SYBZWU1-O1tLEPGQ9AI2EZjcHp60Vs5eL9l75X3uw/viewform">
          <button className='Categories'>Clubs Funding Application</button>
        </a>
        <a className='Categories' className ="card-leads" href="https://docs.google.com/document/d/1UPBjlHAmMsutsL9CanyyLAroq7_CjUQGBO-5YGY2tTI/edit">
          <button className='Categories'>Clubs Guidlines</button>
        </a>
        <a className='Categories' className ="card-leads" href="https://docs.google.com/forms/d/e/1FAIpQLSfkJI5qw_puxyJ6X2gZ7XsXda33-UFLzSG4VpsdvQfus4WU_g/viewform">
          <button className='Categories'>Clubs Creation Application</button>
        </a>  
      </div>
    </div>
  );
}

export default App;