import React from 'react'
import Annances from '@/components/annances';
import Hero from '@/components/hero2';
import Programme from '@/components/programmes';
import Contact from '@/components/Contacts';
export default function page() {
  return (
    <div>
       <Hero
        cName="hero"
        heroimg ="https://i.ibb.co/R3LfjVb/background.jpg"
        title="LES   OUEVRES   SOCIALES"
        text="Gérez votre dossier professionnel et communiquez avec
         l'administration en toute simplicité grâce à notre site!"
        btntext="LOG IN"
        url ="/Login"
        btnClass ="show"
        />
      
      
      <Annances /> 
     <Programme  /> 
     <Contact /> 
    </div>
  )
}
