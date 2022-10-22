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

  console.log(filteredClubs)

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
  );
}

export default App;