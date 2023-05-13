'use client'
import {React} from 'react';
import { useState, useEffect } from 'react';
import {User} from '@/components/User'
import '../../globals.css'
import { piecejointes } from '@/components/piecejointes';
import axios from 'axios';
import {AiFillFileImage} from 'react-icons/ai'
import { useRouter } from 'next/navigation';
import 'react-icons'


export default  function Page() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [isLoadingButton, setLoadingButton] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get('https://server-social-benefits.vercel.app/verify', { headers, withCredentials: true })
      .then((response) => {
        if (response.data.email === 'admin@com') { setLoading(false); router.push('/Admin/Employees');
        } else {
          const employeeEmail = response.data.email;
          axios
            .get(`https://server-social-benefits.vercel.app/searchAccounts?for=${employeeEmail}`)
            .then((employeeResponse) => {
              setCurrentEmployee(employeeResponse.data[0]);
              setLoading(false);
              console.log(employeeResponse.data[0])
            })
            .catch((error) => {
              console.error(error?.response?.data);
              router.push('/');
            });
        }
      })
      .catch((error) => {
        console.error(error?.response?.data);
        router.push('/');
      });
  }, []);


 return (
  <div className='objetdem'>
     <div className='cont1'>
     <h1>OBJET DE DEMANDE</h1>
     <span>Service</span>
     </div>
     <div className='cont2'>
      <div className='cont5'>
     {User.map((val, key)=> {
      return(
        <div className='objimg' key={key}>
           {currentEmployee && currentEmployee.profileImageUrl && (
             <img src={currentEmployee.profileImageUrl} alt="" className="picture" />
                   )}
       <div>
         <div className="name">{currentEmployee ? currentEmployee.name : ''}</div>
            <div className="job"> {currentEmployee ? currentEmployee.job : ''} </div>
      </div>

             

        </div>  
      )
    })}
      </div>
      <h2>CONTENU</h2>
      <p> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
       Description Description Description Description Description
        Description Description Description Description Description 
        Description Description Description Description Description 
        Description Description Description Description Description 
        Description Description Description Description Description 
        Description Description Description Description </p>
       <h2>PIECE JOINTES</h2>
       <div className='cont7'>
         {piecejointes.map((item,index) => {
          return(
            <div className='cont8'>
            <a href={item.file}><AiFillFileImage size={40}/> </a>
            <h4>{item.titre}</h4>
            </div>
          )
         })}
       </div>

       </div>
       <div className='cont6'>
       <h2>ETAT DE LA DEMANDE</h2>
       
       <div className='etat'>
        <p className='etat1'> En cours de traitement</p>
        <p className='etat2'>Approuvée</p>
        <p className='etat3'>Refusée</p>
       </div>

       
         <div className='cont3'>
         <a href='/' className='a1'>Supprimer</a>
         <a href='/' className='a2'>Plus d'information </a>
         </div>
     </div>
  </div>

 )}
