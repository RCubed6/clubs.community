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
   * NEW FUNCTION: MADE WITH OPENAI
   */
   React.useEffect(() => {
    axios.get("http://localhost:3001")
      .then((response) => {
        const results = response.data.values;
        results.splice(0, 1);
        let newResults = results.map((result) => {
          let leads = result[4].split(", ");
          let teachers = result[3].split(", ");
          let emails = result[5].split(", ");
          return new Club(result[2], leads, teachers, emails, result[6], result[7]);
        });
        setClubs(newResults);
        setFilteredClubs(newResults);
      });
  }, []);

  /**
   * Callback to handle typing (onChange) of the
   * search inpout field
   * Optomized function. 
   */
     const handleSearch = (event) => {
      const search = event.target.value.toLowerCase();
      if (search) {
        setFilteredClubs(clubs.filter((club) =>
          club.name.toLowerCase().includes(search)
          || club.teachers.join(', ').includes(search)
          || club.leads.join(', ').includes(search)));
      } else {
        setFilteredClubs(clubs);
      }
    }

  if (window.innerWidth < 600) {
    return (
      <div id="mobile">
        <img src="wrench.svg" height={50} alt="wrench" />
        <h1>Sorry, this app is not supported on mobile devices.</h1>
      </div>
    );
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

  // Activates Modal popup
  const createModal = (i) => {
    setSelectedClubDesc(i.description);
    setSelectedClubMail(i.emails.join(', '));
    setSelectedClubAdv(i.teachers.join(', '));
    setSelectedClubLead(i.leads.join(', '));
    setSelectedClubName(i.name);
    setSelectedClubTags(i.categories);
    setDisable(true);
    setShowModal(true);
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
            {filteredClubs.length === 0 ? (
              <div className="loading">
                <p>Loading clubs...</p>
              </div>
            ) : (
            filteredClubs.map((club, index) => (
              // creating div for each club
              <div key={index} className="clubs" onClick={() => createModal(club)}>
              {/* rendering club objects */}
              <h2 className="card-header">{club.name}</h2>
              <p className="card-leads">{club.leads.join(', ')}</p>
              <p className="card-body">{club.description}</p>
            </div>
          )))}
        </div>
      </div>
      {/* rendering popup */}
      { showModal && (
        <React.Fragment>
          <div className='modal-backdrop' onClick={() => setShowModal(false)}></div>
          <div className="modal">
            <h2 className="card-expand-header">{selectedClubName}</h2>
            <p className="card-expand-leads">Lead(s): {selectedClubLead} ({selectedClubMail})</p>
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
        <h1 id="title">Categories:</h1>
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
        <h1 id="title">More Resources:</h1>

        {/* Each button is wrapped by an a tag which means when the button is clicked it will activate the link */}
        <a className='Categories' className ="card-leads" href="https://docs.google.com/forms/d/e/1FAIpQLSc1Z3Uc_SYBZWU1-O1tLEPGQ9AI2EZjcHp60Vs5eL9l75X3uw/viewform">
          <button className='Categories'>Clubs Funding Application</button>
        </a>
        <a className='Categories' className ="card-leads" href="https://docs.google.com/document/d/1UPBjlHAmMsutsL9CanyyLAroq7_CjUQGBO-5YGY2tTI/edit">
          <button className='Categories'>Clubs Guidelines</button>
        </a>
        <a className='Categories' className ="card-leads" href="https://docs.google.com/forms/d/e/1FAIpQLSfkJI5qw_puxyJ6X2gZ7XsXda33-UFLzSG4VpsdvQfus4WU_g/viewform">
          <button className='Categories'>Clubs Creation Application</button>
        </a>  
      </div>
    </div>
  );
}

export default App;