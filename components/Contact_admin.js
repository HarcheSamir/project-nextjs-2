import React from 'react'
import './Contact_admin.css'
import logoesi from '../assets/img/logoesi.png';
import Navbar2 from './Navbar2';

function Contact_admin() {
  
  return (
    <div className='Contact_admin'>

       <Navbar2/>

   <div>
    <p className='cher-visiteur'> Cher visiteurs,</p>
    <p className='text1'> Si vous avez des questions, ou vous souhaitez vous inscrire pour bénéficier des avantages offerts
    par notre programme, veullez contacter notre équipe d'administrateurs par e-mail à l'adresse:</p>
    <p className='text4'>d.amarbensaber@esi-sba.dz</p>
    <p className='text5'>ou</p>
    <p className='text6'>m.amrane@esi-sba.dz</p>
    <p className='text7'>Cordialement, </p>
    <p className='text8'>L'équipe d'administrateurs.</p>
    </div>
    </div>
  )
} export default Contact_admin;

