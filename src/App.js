import './App.css';
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

  return (
    <div className="App">
      <input onChange={handleSearch} type="text"/>
      {filteredClubs.map((club, index) => (
        <div key={index}>
          {club[2]}
        </div>
      ))}
    </div>
  );
}

export default App;
