'use client'
import "./hero.css"; 

function Hero (props){
 return(
  <div className="Heroo" id="home-section">
   <div className={props.cName}>
    <img  alt ="image" src={props.heroimg}></img>
   <div className="hero-text">
      <h1>{props.title}</h1>
      <p>{props.text} </p>
      <a href ={props.url} className={props.btnClass}> {props.btntext} </a>
   </div>
   </div>
  </div>
 )
}
  export default Hero;