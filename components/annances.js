'use client'
import {MdChevronRight} from 'react-icons/md'
import {MdChevronLeft} from 'react-icons/md'
import './annances.css'
import { annancesdata } from './annancesdata'
//import {slideleft} from'./slidleft.js'
//import {slideright} from'./slidright.js'
const Annances =() =>{
  const slideright =()=>{
    var slider=document.getElementById('slider')
    slider.scrollLeft=slider.scrollLeft +800
   };
   const slideleft =()=>{
    var slider=document.getElementById('slider')
    slider.scrollLeft= slider.scrollLeft -800
   };
 return (
   <div className="annances" id="annonces-section" >
    
    <h1>NOS  ANNANCES</h1>

    <div className='imgarrow'>
      <MdChevronLeft  onClick={slideleft} size={120} color='#FF3548'
       className='left' />

    <div id='slider' className='id-item'>
      
    {annancesdata.map((item,index) => {
        return (
          <div className='img-item'  >
          <img  className='img' alt='annance' src= {item.img} />
         <div className='itemshp' >
         <h2 >{item.titre}</h2>
         <a href=''>View More</a>
         <p>{item.description}</p>
         </div>
         </div>
         
        )
         })}
         
         
     </div>
     <MdChevronRight size={120} color='#FF3548' onClick={slideright}
      className='right'/>
    
      
    </div>
     
   </div>
 )
}

export default Annances