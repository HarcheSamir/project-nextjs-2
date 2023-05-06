import React from 'react'
import Registration from './Registration';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useEffect ,useState  } from 'react';
import axios from 'axios';
const RegistrationRegistration = () => {


    const navigate = useNavigate();
   
    useEffect(() => {
     const token = localStorage.getItem('token');
    const id = localStorage.getItem('id')
     const headers = { Authorization: `Bearer ${token}` };
     if(id!="admin@com") navigate('/Login')

     axios
       .get('https://server-social-benefits.vercel.app/verify', { headers, withCredentials: true })
       .then((response) => {
         console.log(response.data.email)
       })
       .catch((error) => {
         console.error(error.response.data);
        navigate('/Login')
       })
 
   }, [navigate]);
 




  return (
    <div>
        <div className="container">
          <Sidebar/> 
          <div className="margin">
            <Registration/>
          </div>
        </div>
    </div>
  )
}

export default RegistrationRegistration