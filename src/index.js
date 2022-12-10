import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './tests/reportWebVitals';
import Login from './login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class Index extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="login" element= {<Login/>}/>
          <Route path="/" element= {<App/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}

//run app component which has the bulk of the code for the project.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Index></Index>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
