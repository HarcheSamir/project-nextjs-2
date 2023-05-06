'use client'
import 'react-icons'
import "./programmes.css"
import Accordion from "./programmeitem";
import { useState } from "react";
import { programmedata } from "./progdata";
//import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

const Programme =()=>{
  const [active,setActive]=useState("Title1");
 return (
  
  <div  className="programme" id="programme-section">
    <h1>NOTRE PROGRAMME</h1>
  
    {programmedata.map((item,index) => {
        return (
          
    <Accordion title ={item.titre}
                des={item.Description}
                pour={item.Pour}
                emp={item.Employé}
                pa={item.Papierdem}
                active={active} setActive={setActive} />
    
    
       )})}
        
  </div>
 )
}

export default Programme