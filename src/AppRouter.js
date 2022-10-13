import React from "react";
import App from './App.css';
import Funding from './funding.js'
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

function AppRouter() {
    return (
        <Router>
        <Routes>
            <Route exact path='/' exact element={<App/>} />
            <Route path='/clubs' element ={<App/>}/>
            <Route path='/funding' element={<Funding/>}/>
        </Routes>
        </Router>
    );
    }

    export default AppRouter;