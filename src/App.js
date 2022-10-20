// import './App.css';
import './index.css'
import axios from "axios";
import React from "react";

/**
 * Entrypoint component for App 
 */
function App() {
  
  // Component State
  const [clubs, setClubs] = React.useState([])
  const [filteredClubs, setFilteredClubs] = React.useState([])
  
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
   * Callback to handle typing (onCHange) of the
   * search inpout field
   */
  const handleSearch = (event) => {
    const search = event.target.value
    if (search) {
      setFilteredClubs(clubs.filter((club) => club[2]
      .toLowerCase()
      .includes(search.toLowerCase())))
    } else {
      setFilteredClubs(clubs)
    }
  }

  console.log(filteredClubs)

  return (
  
    <div class="content-center">
      <h1 class="text-blue-600">Fuck tailwind</h1>
      <h1 class="text-green-800">Hello</h1>
      <input onChange={handleSearch} type="text"/>
        <div class="grid grid-cols-2">
          {filteredClubs.map((club, index) => (
            <div key={index} className="clubs">
              <h2 class="card-header">{club[2]}</h2>
              <p class="card-leads">{club[4]}</p>
              <p class="card-body">{club[6]}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
