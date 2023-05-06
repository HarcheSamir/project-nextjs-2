'use client'
import { useState } from "react";
import {IoIosArrowDropdown} from 'react-icons/io'
import {CgShapeHexagon} from 'react-icons/cg'
export default function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b px-4  w-screen max-w-[65rem]">
    <div
      className="w-full py-2 text-left focus:outline-none"
    
    >
      <div className="flex w-full items-center justify-between">
        <p className="text-xl font-bold w-[50%] truncate  text-blue-800 ">{title} :</p>
        <IoIosArrowDropdown
          onClick={() => setIsOpen(!isOpen)}
          className={`w-6 h-6  transition-transform cursor-pointer text-red-500 ${
            isOpen ? "transform duration-500 rotate-180" : "duration-500"
          }`}
        ></IoIosArrowDropdown>
      </div>
    </div>
    <div
      className={`overflow-hidden transition-all max-h-0 ${
        isOpen ? "max-h-40 duration-1000 ease-out" : " ease-in"
      }`}
    >
      <div className="py-2 flex flex-col w-full  text-gray-500">
       
        <div className="flex items-center  flex-row w-full">
          <CgShapeHexagon className="text-red-500 mr-1" />
          <p className="whitespace-nowrap text-red-500 font-bold"> Description : &nbsp;</p>
        <p className="truncate w-full"> {content}</p>
        </div>

        <div className="flex items-center  flex-row w-full">
          <CgShapeHexagon className="text-red-500 mr-1" />
          <p className="whitespace-nowrap text-red-500 font-bold"> Pourcentage / Montant De Remboursement : &nbsp;</p>
        <p className="truncate w-full"> {content}</p>
        </div>
        <div className="flex items-center  flex-row w-full">
          <CgShapeHexagon className="text-red-500 mr-1" />
          <p className="whitespace-nowrap text-red-500 font-bold"> Employés Concernés : &nbsp;</p>
        <p className="truncate w-full"> {content}</p>
        </div>
        <div className="flex items-center  flex-row w-full">
          <CgShapeHexagon className="text-red-500 mr-1" />
          <p className="whitespace-nowrap text-red-500 font-bold"> Papiers Demandés : &nbsp;</p>
        <p className="truncate w-full"> {content}</p>
        </div>

      </div>
    </div>
  </div>
  
  );
}
