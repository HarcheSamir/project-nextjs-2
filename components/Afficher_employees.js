
import React from 'react';
import Sidebar from './Sidebar';
import { Searchbar } from './searchbar';
import './Afficher_employees.css';
import Form from  './Form';
import {useState} from "react";
import List_employé from './List_employé';

function Afficher_employees() {
  const [input, setInput]= useState("");
  const [employé, setEmployé] = useState([]);
  const [editemployé, setEditEmployé]= useState(null);
  return (
    <div className='afficher_employees'>
    <div className="contaisner">
          <Sidebar/> 
          </div>
          <div className='searchbar'> 
          <Searchbar/>
            </div> 
            <label className='empl-h1'>Employees :</label> 
            <div className='app-wrapper'> </div>
            <h2 className='empl-h2'>Employees</h2>  
            <h3 className='empl-h3'>Job</h3>
            
            <div > 
          <List_employé employé={employé} setEmployé={setEmployé} setEditEmployé={setEditEmployé}/>
            </div> 
          </div>
          
     );
}
export default Afficher_employees;


/*   <div> 
            <Form 
            input={input}
            setInput={setInput}
            employé={employé}
            setEmployé={setEmployé}
            editemployé={editemployé}
            setEditEmployé={setEditEmployé}
            /> 
               </div> */