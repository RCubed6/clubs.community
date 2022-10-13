import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Club from './club.js';
import AppRouter from './AppRouter';

// TO BE REPLACED BY FIREBASE CLUB ARRAY


const ChessClub = new Club("Team", "Chess", "Chess", "340", "3:15-4"); 
export default ChessClub;

// Test logs
console.log(ChessClub.get_name);
console.log(ChessClub.name);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    /<App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
