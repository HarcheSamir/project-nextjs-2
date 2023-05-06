import React from 'react';
import {Link} from 'react-router-dom';
import { Component } from 'react';
import "./Navbar2.css";
import { menuitems } from './menuitems';
 


class Navbar extends Component {
   handleClick(sectionId) {
     const element = document.getElementById(sectionId);
     element.scrollIntoView({ behavior: "smooth" });
   }
 
   render() {
     return (
       <nav className='navbaritem'>
         <h1 className='navbar-logo'>ESI SBA</h1>
 
         <ul className='nav-menu'>
           {menuitems.map((item, index) => {
             return (
               <li key={index} >
                 <span className={item.cName} >
                   
                   <Link to={item.url}>{item.title}</Link>
                 </span>
                  
               </li>
             );
           })}
         </ul>
       </nav>
     );
   }
 }
 
 export default Navbar;