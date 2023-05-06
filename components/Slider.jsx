'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import {IoIosArrowDropright , IoIosArrowDropleft} from 'react-icons/io'

const images = [
    {
        image :   "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" ,
        text : " one Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam expedita voluptatibus quas, maxime sequi magnam praesentium tenetur voluptatem minima necessitatibus.", 
        title : "Lorem ipsum " 
    } ,
{
    image :     "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
    text : " two  amet consectetur adipisicing elit. Quibusdam expedita voluptatibus quas, maxime sequi magnam praesentium tenetur voluptatem minima necessitatibus." ,
    title : "Adoodi racnid:"
} ,
{
    image :       "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    text : " three  Quibusdam expedita voluptatibus quas, maxime sequi magnam praesentium tenetur voluptatem minima necessitatibus.", 
    title : "Darix bnative"
}
];

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <div id="ads" className="flex flex-col w-screen items-center">
        <p className="text-5xl  font-mono mt-20  border-b-2 border-red-600  text-blue-900">Nos Annonces</p>
        <div className="relative mt-10 w-screen max-w-[65rem] aspect-[7/4] sm:aspect-[3/1]">

<IoIosArrowDropleft
className='absolute z-10  w-7 sm:w-10 h-7 sm:h-10  sm:-translate-y-[50%] -translate-y-[80%] hover:text-blue-800 left-0  cursor-pointer hover:scale-110  sm:-translate-x-[150%]  text-red-500  top-[50%]'
  onClick={handlePrevClick}
>
  {"<"}
</IoIosArrowDropleft>

<IoIosArrowDropright 
  className=' absolute z-10  w-7 sm:w-10 h-7 sm:h-10  sm:-translate-y-[50%] -translate-y-[80%] hover:text-blue-800 right-0 cursor-pointer hover:scale-110  sm:translate-x-[150%]  text-red-500  top-[50%]'
  onClick={handleNextClick}
>
  {">"}
</IoIosArrowDropright>




{images.map((item, index) => (
  <div key={index} className={`flex absolute w-full h-full   flex-row items-end ${
    index === activeIndex ? "opacity-100" : "opacity-0"
  } transition-opacity duration-1000`}>
    <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-transparent to-white z-10'></div>
    <Image 
      fill
      src={item.image}
      alt={`Slide ${index}`}
      className= " object-fill "
    />
    <div className="flex-col ml-4 overflow-hidden relative mb-2 z-10 grow ">
      <p className='text-blue-800 font-mono text-2xl font-bold'>{item.title} </p>
      <p className='truncate w-[100%] '> {item.text}</p>
    </div>
    <button className='z-10 flex-none hover:duration-300 hover:scale-110 hover:bg-blue-800 bg-red-600 text-white rounded py-2 px-4 m-4'>View More</button>
  </div>
))}




<div className="absolute top-0 left-0 right-0 flex justify-center mt-4">

{images.map((_, index) => (
  <button
    key={index}
    onClick={() => handleDotClick(index)}
    className={`h-3 w-3  shadow-xl mx-1 rounded-full ${
      index === activeIndex ? "bg-red-500" : "bg-gray-300"
    }`}
  ></button>
))}

</div>



</div>
    </div>
    
  
  );
};

export default Slider;

