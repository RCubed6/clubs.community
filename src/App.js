import './main.css'
import axios from "axios";
import React from "react";
import { render } from '@testing-library/react';
/**
 * Entrypoint component for App 
 */
 const { initializeApp } = require("firebase/app");
 const { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } = require("firebase/auth");
 //const { getAnalytics } = require("firebase/analytics");
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDFvH4CTR0jSeblHhVZHx9CvunNxGBgfX8",
   authDomain: "clubs-community-be504.firebaseapp.com",
   projectId: "clubs-community-be504",
   storageBucket: "clubs-community-be504.appspot.com",
   messagingSenderId: "34171441682",
   appId: "1:34171441682:web:7096c5477a95391d9d3ecb",
   measurementId: "G-R13RYWN08G"
 };

 const app = initializeApp(firebaseConfig)
 const auth = getAuth(app)
 //connectAuthEmulator(auth, "http://localhost:9099")








 
function App() {

  // Component State
  const [clubs, setClubs] = React.useState([])
  const [filteredClubs, setFilteredClubs] = React.useState([])
  const [selectedClub, setSelectedClub] = React.useState(undefined)
  const [authed, setAuth] = React.useState(false)
  const [passphrase, setPassphrase] = React.useState("Clubs.Community")
  //const authed = false

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


  function signInCheck() {
    console.log("    ");
    let emailValue = document.getElementById("IEmail");
    let passValue = document.getElementById("IPassphrase");
    if (passValue===passphrase&&emailValue.includes("nuevaschool.org")){
      setAuth(true);
      console.log("authed");
    } else {
      console.log("Not correct passphrase or email domain.");
    }
  }

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
if (authed){
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
              <h2 className="card-header">{club[2]}</h2>
              <p className="card-leads">{club[4]}</p>
              <p className="card-body">{club[6]}</p>
            </div>
          ))}
        </div>
      </div>
      {/* rendering popup */}
      <dialog>
        <p className="card-expand">{selectedClub}</p>
        <span className="close" onClick={closeModal}>&times;</span>
      </dialog>
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
} else {
  return (
    <div>
      <label for="IEmail">Email:</label><br></br>
      <input type="text" id="IEmail" name="IEmail"></input><br></br>
      <label for="IEmail">Passphrase:</label><br></br>
      <input type="text" id="IPassphrase" name="IPassphrase"></input><br></br><br></br>
      <button type="button" id="SignInButton" onClick={signInCheck()}>Sign In</button>
    </div>
    //eval('let email = prompt("What is your email?"); let password = prompt("What is the passphrase?"); if (typeof email != "object"&&typeof password != "object"){if (email.includes("nuevaschool.org")&&password==passphrase){setAuth(true)}}')

  )
  // return (
  //   <script type="text/javascript">
  //   function handleCredentialResponse(response) {
  //     console.log("Encoded JWT ID token: " + response.credential)
  //   }
  //   window.onload = function () {
  //     google.accounts.id.initialize({
  //       client_id: "441589371385-4gpjtfr1mmoocoi9eejeev5j7bq6saro.apps.googleusercontent.com",
  //       callback: handleCredentialResponse
  //     });
  //     google.accounts.id.renderButton(
  //       document.getElementById("buttonDiv"),
  //       { theme: "outline", size: "large" }  // customization attributes
  //     );
  //     google.accounts.id.prompt(); // also display the One Tap dialog
  //   }
  //   </script>
  // )
  // return (
  //   <div>
  //     <script src="https://accounts.google.com/gsi/client" async defer></script>
  //     <div id="g_id_onload"
  //        data-client_id="441589371385-4gpjtfr1mmoocoi9eejeev5j7bq6saro.apps.googleusercontent.com"
  //        data-login_uri="http://localhost:3000"
  //        data-auto_prompt="false">
  //     </div>
  //     <div class="g_id_signin"
  //        data-type="standard"
  //        data-size="large"
  //        data-theme="outline"
  //        data-text="sign_in_with"
  //        data-shape="rectangular"
  //        data-logo_alignment="left">
  //     </div>
  //   </div>
  // )

}
}

export default App;
