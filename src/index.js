import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './tests/reportWebVitals';
// TO BE REPLACED BY FIREBASE CLUB ARRAY


// const { initializeApp } = require("firebase/app");
//  //import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//  //const { getAnalytics } = require("firebase/analytics");
//  // TODO: Add SDKs for Firebase products that you want to use
//  // https://firebase.google.com/docs/web/setup#available-libraries

//  // Your web app's Firebase configuration
//  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//  const firebaseConfig = {
//    apiKey: "AIzaSyDFvH4CTR0jSeblHhVZHx9CvunNxGBgfX8",
//    authDomain: "clubs-community-be504.firebaseapp.com",
//    projectId: "clubs-community-be504",
//    storageBucket: "clubs-community-be504.appspot.com",
//    messagingSenderId: "34171441682",
//    appId: "1:34171441682:web:7096c5477a95391d9d3ecb",
//    measurementId: "G-R13RYWN08G"
//  };

//  const app = initializeApp(firebaseConfig)
 //const auth = getAuth(app)

// const ChessClub = new Club("Team", "Chess", "Chess", "340", "3:15-4"); 
// export default ChessClub;

// // Test logs
// console.log(ChessClub.get_name);
// console.log(ChessClub.name);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*  */}
    <App></App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
