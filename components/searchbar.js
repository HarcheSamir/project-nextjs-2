import React from 'react'
import './searchbar.css';
import { Link } from 'react-router-dom';

export const Searchbar = () => {
  return (
    <div className='searchbar'>
    <div className='input-wrapper'>
        < input placeholder='Recherche....'/>
    </div>
    <div class="btn-field"> 
       <Link to='/Registration'>
        <button type='button'>Ajouter employé</button>
      </Link>
    </div>
    </div>
  )
}
