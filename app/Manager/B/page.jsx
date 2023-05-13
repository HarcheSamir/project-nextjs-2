'use client'
import React, { useState } from 'react';
import {User} from '@/components/User'
import '../../globals.css'
import { piecejointes } from '@/components/piecejointes';
import {AiFillFileImage} from 'react-icons/ai'
import 'react-icons'


export default function Page() {
  const [traiterDem, setTraiterDem] = useState(false);

  const handleTraiterClick = () => {
    setTraiterDem(true);
  };
  const handleAnnulerClick = () => {
    setTraiterDem(false); 
  };
  
 return (
  <div className="objetdem">

  <div className="pt-[4%] pl-[5%]">
    {User.map((val, key) => {
      return (
        <div className="objimg flex items-center" key={key}>
          <img src={val.picture} alt="" className="rounded-full w-[70px] mr-4" />
          <div>
            <div className="name text-[#0B59A1] text-[22px] font-normal leading-6 tracking-normal">{val.name}</div>
            <div className="job text-gray-400 text-[18px]">{val.job}</div>
          </div>
        </div>
      );
    })}
  </div>

  <hr className="border-t border-gray-200 mt-[2%]" />

  <div className="pt-[4%] pl-[5%] w-[96%]">
    <span className="text-[30px] font-bold text-red-600  ">OBJET DE DEMANDE</span>
    <span className="text-gray-400 text-[25px] pl-[56%] ">Date</span>
  </div>
  <div className="pl-[5%] w-[96%]">
    <span className="text-gray-400 text-[25px]  ">Service</span>
    <span className="text-gray-400 text-[25px] pl-[70%] ">11/11/2011</span>
  </div>

  <h2 className="text-[30px] font-bold text-[#0B59A1] pt-[3%] pl-[5%]">CONTENU :</h2>
  <p className="objetdem text-[22px] font-normal text-gray-700 mb-30 pt-[3%] pl-[5%] w-[96%]">
    Description Description Description Description Description
    Description Description Description Description Description Description Description Description
    Description Description Description Description Description Description Description Description
    Description Description Description Description Description Description Description Description
    Description Description Description Description Description
  </p>
  <h2 className="text-[30px] font-bold text-[#0B59A1] pt-[3%] pl-[5%]">PIECE JOINTES :</h2>
  <div className="cont7 flex flex-wrap justify-between pl-[5%] pt-[3%] w-[90%]">
    {piecejointes.map((item, index) => {
      return (
        <div className="cont8 border rounded-[6px] border-gray-200 w-[14%] pt-[4%] pb-[4%] flex flex-col items-center justify-center" key={index}>
          <a href={item.file} className="text-white">
            <AiFillFileImage size={20} />
          </a>
          <h4 className="text-lg font-normal text-gray-700 w-[100%] text-center">{item.titre}</h4>
        </div>
      );
    })}
  </div>

  <h2 className="text-[30px] font-bold text-[#0B59A1] pt-[3%] pl-[5%]">MOTIF D'ACCEPTATION INITIALE :</h2>
  <p className="objetdem text-[22px] font-normal text-gray-700 mb-30 pt-[3%] pl-[5%] w-[96%]">
    Description Description Description Description Description
    Description Description Description Description Description Description Description Description
    Description Description Description Description Description Description Description Description
    Description Description Description Description Description Description Description Description
    Description Description Description Description Description
  </p>

  {traiterDem ? (
  <div className='cont'>

<hr className="border-t border-gray-200 mt-[5%]" />
       <h3 className="text-[30px] font-bold text-red-600 pl-[5%] mt-[5%]" >TRAITEMENT DE LA DEMANDE</h3>     
       <div className=''>
       <div className="objetdem text-[22px] font-normal text-gray-700 pt-[2%] pl-[20%]">
  <input type="radio" name="state" value="accepter demande"
    onChange={(e) => MediaStreamAudioDestinationNode(e.target.value)}
    className='mr-[5%]'
     />
  Accepter demande
</div>

         <div className="objetdem text-[22px] font-normal text-gray-700 pt-[2%] pl-[20%]">
         <input type='radio' name='state' value="refuser demande" 
         className='mr-[5%]'
         onChange={e=>MediaStreamAudioDestinationNode(e.target.value)}
         />Refuser demande
         </div>
        </div>

       <h2 className="text-[30px] font-bold text-[#0B59A1] pt-[3%] pl-[5%]" >MOTIF DE REFUS / ACCEPTATION :</h2>
       <textarea className="font-normal text-gray-700 mb-30 mt-[3%] ml-[5%] w-[90%] h-[150px] border rounded-[6px] border-gray-200 p-[10px] focus:border-blue-500"></textarea>

 <div className="cont3 flex justify-end w-[90%] pt-[4%] pb-[4%] left-[0%] space-x-4">
  <button className="rounded-md font-bold text-red-500 py-2 px-4 text-center bg-white border border-red-500" onClick={handleAnnulerClick} > Annuler</button>
  <button className="rounded-md font-bold text-white py-2 px-4 text-center bg-red-600" >Terminer </button>
</div>

</div> ) : null}

{traiterDem ? null : (
  <div className="cont3 flex justify-end w-[90%] pt-[4%] pb-[4%] left-[0%]">
    <button className="rounded-md font-bold text-white py-2 px-4 text-center bg-red-600"
    onClick={handleTraiterClick}     >
      Traiter la demande
    </button>
  </div>)}
</div>



 )}
