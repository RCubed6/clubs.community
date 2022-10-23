import './index.css'
import axios from "axios";
import React from "react";
import { render } from '@testing-library/react';
import { isDisabled } from '@testing-library/user-event/dist/utils';

/**
 * Entrypoint component for App 
 */


 
function App() {

  // Component State
  const [clubs, setClubs] = React.useState([])
  const [filteredClubs, setFilteredClubs] = React.useState([])
  const [selectedClub, setSelectedClub] = React.useState(undefined)

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
  // {/* For category button */ }
  const handleClick = (event) => {
    const search = event.target.value
    if (search) {
      setFilteredClubs(clubs.filter((club) =>
        club[7].toLowerCase().includes(search.toLowerCase())))
    } else {
      setFilteredClubs(clubs)
    }
  }

  // // console.log(filteredClubs)

  // Activates Modal popup
  
  const createModal = (i) => {
    setSelectedClub(i[6])
    console.log("Activating Modal")
    setDisable(true)
    dialog.showModal();
  }


  // Deactivates Modal popup
  const closeModal = () => {
    dialog.close();
  }


  return (
    <div className="">
      {/* Example of a category button; not sure how to integrate */}
      <button className="categories" onClick={handleClick} value={"Academic"}>
        Academic
      </button>
      <input onChange={handleSearch} type="text" placeholder="Search..." />
      <div className="container">
        {filteredClubs.map((club, index) => (
          <div className="parentClubs">
            <div key={index} className="clubs" disabled={false} onClick={() => createModal(club)}>
              <h2 className="card-header">{club[2]}</h2>
              <p className="card-leads">{club[4]}</p>
              <p className="card-body">{club[6]}</p>
            </div>
          </div>
        ))}
      </div>
      <dialog>
        <p>{selectedClub}</p>
        <span className="close" onClick={closeModal}>&times;</span>
      </dialog>

      <div className="Categories">
        <h1 className='Categories-header'>Categories:</h1>
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
    </div>
    


  );
}

export default App;