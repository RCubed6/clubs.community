import React from 'react';
import "./category.css";


export function Category(props) {
  return (
    <div className='App'>
      <h1>Categories</h1>
      <button>Academic</button>
      <button>Activism</button>
      <button>Affinity Groups</button>
      <button>Community Service</button>
      <button>Hobbies & Interests</button>
      <button>Language & Culture</button>
      <button>Sports & Fitness</button>
      <button>STEM</button>
      <button>Visual & Performing Arts</button>
      <button>Writing & Literature</button>
    </div>
  );
}