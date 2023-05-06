'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';


export default function Page() {
  const [announcements, setAnnouncements] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Add activeIndex state variable

  useEffect(() => {
    fetch('https://server-social-benefits.vercel.app/announcements')
      .then(response => response.json())
      .then(data => {
        setAnnouncements(data);
      })
      .catch(error => {
        console.log('Error fetching announcements:', error);
      });
  }, []);

  return (
    <main className="flex w-[80%]  flex-col items-center">
      <p className="text-5xl font-mono mt-20 border-b-2 border-red-600 text-blue-900 mb-20">Nos Annonces</p>
      <div className="absolute top-0 right-0 mt-4">
      <button className="bg-[#DC143C] mb-2 sm:mb-0 hover:scale-110 hover:bg-blue-500 ml-4 text-sm font-bold text-white rounded-lg py-4 px-20 mt-16 mr-4">Ajouter annonce</button>
      </div>
      <div className={`w-full items-center justify-center flex ${announcements.length > 2 ? 'flex-wrap' : ''}`}>
        {announcements.map((item, index) => (
          <div
            key={index}
            className={` flex items-center transition-opacity duration-1000 ${announcements.length > 2 ? 'w-full sm:w-auto' : ''} ml-12`}
          >
            <div className="w-40 h-40 relative">
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-transparent to-white z-10"></div>
              <Image
                src={item.cover_url}
                alt=''
                className="object-cover rounded-md"
                fill
               />
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-blue-800 font-mono text-2xl font-bold">
                {item.title}
              </p>
              <p className="truncate w-full">{item.description}</p>
              <button className="border-[#DC143C] text-[#DC143C] hover:scale-110 hover:bg-[#2c3a51] hover:border-0 hover:text-white text-xs font-bold border-2 rounded-lg py-2 px-4 mt-8">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
