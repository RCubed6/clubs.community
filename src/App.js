import './index.css'
import axios from "axios";
import React from "react";
import { render } from '@testing-library/react';
/**
 * Entrypoint component for App 
 */


 
function App() {

  // Component State
  const [clubs, setClubs] = React.useState([])
  const [filteredClubs, setFilteredClubs] = React.useState([])

  const the_button = document.querySelector(".js-btn")
  const modal = document.querySelector(".modal")
  // Hook for disabling club div onclick
  const [disable, setDisable] = React.useState(false);

  // const closeSpan = document.querySelector(".close")

  /**
   * Get list of Clubs from API
   */
  React.useEffect(() => {
    axios.get("http://localhost:3001")
      .then((response) => {
        const results = response.data.values;
        results.splice(0, 1);
        setClubs(results);
        setFilteredClubs(results)
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
        club[2].toLowerCase().includes(search.toLowerCase())
        || club[4].toLowerCase().includes(search.toLowerCase())))
    } else {
      setFilteredClubs(clubs)
    }
  }
  // {/* For category button */}
  const handleClick = (event) => {
    const search = event.target.value
    if (search) {
      setFilteredClubs(clubs.filter((club) => 
      club[7].toLowerCase().includes(search.toLowerCase())))
    } else {
      setFilteredClubs(clubs)
    }
  }

  // console.log(filteredClubs)

// Activates Modal popup
//
// MODAL ACTIVATES WHEN TRYING TO CLOSE, NEED TO FIX createModal and closeModal:
  const createModal = (event) => {
    setDisable(true)

    console.log("Activating Modal")
    document.body.style.display = "background-color: rgba(0,0,0,0.25);"
    modal.style.display = "block";
  }


// Deactivates Modal popup
// 
// TO FIX:
  const closeModal = (event) => {
    console.log("Close modal")
    modal.style.display = "none"
    document.body.style.display = "background-color: rgba(0,0,0,0);"
  }

  return (
    <div className="">
      <div className='Main'>
          <input onChange={handleSearch} type="text" placeholder="Search..." />
          <div className="container">
            {filteredClubs.map((club, index) => (
              <div key={index} className="clubs" disabled={disable} onClick={createModal}>
                <div className="modal">
                  <div className="modal_content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p>I'm A Pop Up!!!</p>
                  </div>
                </div>


              <h2 className="card-header">{club[2]}</h2>
              <p className="card-leads">{club[4]}</p>
              <p className="card-body">{club[6]}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Prints category buttons to sort clubs by category */}
      <div className="Categories-bucket">
        {/* Category element header */}
        <h1>Categories:</h1>
        {/* Buttons; when clicked they activate the constant handleClick with a given value, and the program sorts the clubs by that value*/}
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