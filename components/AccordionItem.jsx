import { useState } from "react";
import { IoIosArrowDropdown } from 'react-icons/io'
import { CgShapeHexagon } from 'react-icons/cg'
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
export default function AccordionItem({ title, description, coverage, needed_proofs , imageUrl}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const router = useRouter();

  const handleServiceClick = () => {
    setShowModal(true);
    console.log("selected service : ", title )
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="border-b px-4 z-50  w-full max-w-[65rem]">
      <div className="w-full py-2 text-left focus:outline-none">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl cursor-pointer w-[50%] truncate  text-[#2C435A]" onClick={handleServiceClick}>
            {title} :
          </p>
          <IoIosArrowDropdown
            onClick={() => setIsOpen(!isOpen)}
            className={`w-6 h-6  transition-transform cursor-pointer text-red-500 ${
              isOpen ? "transform duration-500 rotate-180" : "duration-500"
            }`}
          />
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
            <p className="truncate w-full"> {description}</p>
          </div>
          <div className="flex items-center  flex-row w-full">
            <CgShapeHexagon className="text-red-500 mr-1" />
            <p className="whitespace-nowrap text-red-500 font-bold"> Couverture : &nbsp;</p>
            <p className="truncate w-full"> {coverage}</p>
          </div>
          <div className="flex items-center  flex-row w-full">
            <CgShapeHexagon className="text-red-500 mr-1" />
            <p className="whitespace-nowrap text-red-500 font-bold"> Papiers Demandés : &nbsp;</p>
            <p className="truncate w-full"> {needed_proofs}</p>
          </div>
        </div>



      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white text-[20px] w-[70%] flex flex-col p-10 rounded-[10px]">
          <p className="text-xl cursor-pointer w-[90%] font-bold text-[#2C435A]" onClick={handleServiceClick}>
            {title} :
          </p>
          <div className="py-2 flex flex-col w-full text-gray-500">
  <div className="flex items-start w-full my-6">
    <CgShapeHexagon className="text-red-500 mr-1" />
    <p className="whitespace-nowrap text-red-500 font-bold">Description : &nbsp;</p>
    <p className="w-full">{description}</p>
  </div>
  <div className="flex items-start w-full my-6"> 
    <CgShapeHexagon className="text-red-500 mr-1" />
    <p className="whitespace-nowrap text-red-500 font-bold">Couverture : &nbsp;</p>
    <p className="w-full">{coverage}</p>
  </div>
  <div className="flex items-start w-full my-6"> 
    <CgShapeHexagon className="text-red-500 mr-1" />
    <p className="whitespace-nowrap text-red-500 font-bold">Papiers Demandés : &nbsp;</p>
    <p className="w-full">{needed_proofs}</p>
  </div>
</div>
<Link legacyBehavior href={imageUrl} passHref>
  <a target="_blank" rel="noopener noreferrer">
    <div className="w-40 shadow ring-[2px] ring-zinc-400 hover:ring-blue-500 hover:ring-[3px] cursor-pointer overflow-hidden rounded h-40 relative">
      <Image className="p-2" fill src={imageUrl} alt="" />
    </div>
  </a>
</Link> 
<div className="flex justify-end mt-4"> {/* Add mt-4 class */}
        <button
          onClick={handleCloseModal}
          className="text-[16px] w-[140px] h-[45px] flex justify-center items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 rounded-[10px]"
        >
          Fermer
        </button>
      </div>

          </div>
        </div>
      )}
    </div>
  );
}
