'use client'
import "./programmes.css"
import {AiOutlineDown} from "react-icons/ai";
import 'react-icons'
import { programmedata } from "./progdata";
import React , {useState} from "react"
const Accordion =({title,des,pour,emp,pa,active,setActive})=>{
 return (
  
  <div className='accordion'>
     <div className='accordionpadd'>
      <div className='container'>
         <h2>{title}</h2>
         <span onClick={()=>setActive(title)}>
          {active === title ? "▼ ":"▲"}
         </span>
      </div>
     </div>
     <div className={(active === title ? "show":"")+ " accordioncontant"}>
     <div className='container'>
         <ul>
           <li>{des}</li>
           <li>{pour}</li>
           <li>{emp}</li>
           <li>{pa}</li>
         </ul>
         
      </div>
     </div>
    </div>



 )
} 
 export default Accordion