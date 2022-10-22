import React from 'react';
import './resources.css'
import "./index.css"

export function Resources(props) {
  return (
    <div className='Resources'>
      <h1>More Resources:</h1>
      <a className='Resources' className ="card-leads" href="https://docs.google.com/forms/d/e/1FAIpQLSc1Z3Uc_SYBZWU1-O1tLEPGQ9AI2EZjcHp60Vs5eL9l75X3uw/viewform">
        <button className='Resources'>Clubs Funding Application</button>
      </a>
      <a className='Resources' className ="card-leads" href="https://docs.google.com/document/d/1UPBjlHAmMsutsL9CanyyLAroq7_CjUQGBO-5YGY2tTI/edit">
        <button className='Resources'>Clubs Guidlines</button>
      </a>
      <a className='Resources' className ="card-leads" href="https://docs.google.com/forms/d/e/1FAIpQLSfkJI5qw_puxyJ6X2gZ7XsXda33-UFLzSG4VpsdvQfus4WU_g/viewform">
        <button className='Resources'>Clubs Creation Application</button>
      </a>
      
    </div>
  );
}

export default Resources;