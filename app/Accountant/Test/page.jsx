'use client'
import { useEffect ,useState } from 'react';
import React from 'react';
import 'react-icons'
import { useSearchParams } from 'next/navigation';
import axios  from 'axios';
import Image from 'next/image';
import { AiFillCaretLeft, AiFillCaretRight , AiOutlineClose } from "react-icons/ai";
import { useRouter } from 'next/navigation';


export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [plusDinfo , setPlusDinfo] = useState(false);
  const [isApproved , setIsApproved] = useState(false);
  const [isRejected , setIsRejected] = useState(false);


  const id = searchParams.get('id');
  const [slider , setSlider] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingPics , setLoadingPics] = useState(true)
  const[records , setRecords] = useState()
  const [pics , setPics] = useState()
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await axios.get("https://server-social-benefits.vercel.app/searchFilter", {
        params: {
          id : id , 
        },
      });
      setRecords(data.records);
      if (records && records.length > 0 && records[0].status === 'approved') { setIsApproved(true) }
      if (records && records.length > 0 && records[0].status === 'rejected') { setIsRejected(true) }
      setLoading(false);

    }
    fetchData();
  }, [id]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProofs = async () => {
      try {
        const response = await axios.get(`https://server-social-benefits.vercel.app/pics/${id}`); // Replace '123' with the actual request_id you want to fetch
        setPics(response.data);
        console.log(response.data)
        setLoadingPics(false)
      } catch (error) {
        console.error('Error fetching proofs:', error);
      }
    };

    fetchProofs();
  }, [id]);


  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    setActiveIndex((activeIndex - 1 + pics.length) % pics.length);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % pics.length);
  };

  const handleplusDinfoClick = () => {
    setPlusDinfo(true);
  };

  const handlefermerClick = () => {
    setPlusDinfo(false);
  };

  if (loading) return <p>Loading...</p>
 return (


<div>


  <div className='w-full flex flex-col items-center justify-center '>

  {slider &&  <div className='absolute  h-screen w-screen top-0 left-0 z-50 '>
     <div className=' h-full relative flex items-center justify-center -full bg-black/80'>
      <AiOutlineClose onClick={()=>{setSlider(false)}} className='w-8 h-8 text-zinc-400 absolute top-16 right-8 sm:top-4 sm:right-16 cursor-pointer ' />
<div className="relative w-[80%] sm:w-auto sm:h-[95%] aspect-[3/4]">

<AiFillCaretLeft
className='absolute z-10  w-7 sm:w-10 h-7 sm:h-10  sm:-translate-y-[50%] -translate-y-[80%] hover:text-blue-800 left-0  cursor-pointer hover:scale-110  sm:-translate-x-[150%]  text-red-500  top-[50%]'
  onClick={handlePrevClick}
>
  {"<"}
</AiFillCaretLeft>

<AiFillCaretRight 
  className=' absolute z-10  w-7 sm:w-10 h-7 sm:h-10  sm:-translate-y-[50%] -translate-y-[80%] hover:text-blue-800 right-0 cursor-pointer hover:scale-110  sm:translate-x-[150%]  text-red-500  top-[50%]'
  onClick={handleNextClick}
>
  {">"}
</AiFillCaretRight>


{!loadingPics && pics.map((item, index) => (
  <div key={index} className={`flex absolute w-full h-full   flex-row items-end ${
    index === activeIndex ? "opacity-100" : "opacity-0"
  } transition-opacity duration-1000`}>
    <Image 
      fill
      src={item.image_url}
      alt={`Slide ${index}`}
      className= " object-fill "
    />
     </div>
))}




<div className="absolute bottom-2 left-0 right-0 flex justify-center mt-4">

{!loadingPics && pics.map((_, index) => (
  <button
    key={index}
    onClick={() => handleDotClick(index)}
    className={`h-2 w-2  shadow-xl mx-1 rounded-full ${
      index === activeIndex ? "bg-red-500" : "bg-gray-300"
    }`}
  ></button>
))}

</div>


      <div className="pt-[4%] pl-[5%]">
     
        <div className='flex flex-row  m-4 items-center ' > 
           <div className='w-16 relative h-16 mr-5'><Image className='ring-2 ring-zinc-700 rounded-full  ring-offset-2 rignt' fill src={records[0].profileImageUrl} alt='' /></div>
           
            <div>
            <div className="name text-[#0B59A1] text-[22px] font-normal leading-6 tracking-normal">{records[0].name}</div>
            <div className="job text-gray-400 text-[18px]">{records[0].job} </div>
            </div>

             

        </div>  
  
      </div>

</div>
    </div>
     </div>}
     </div>


     <div className="pt-[4%] pl-[5%]">
     
     <div className='flex flex-row ml-8 m-4 ' > 
        <div className='w-16 relative h-16 mr-5'><Image className='ring-2 ring-zinc-700 rounded-full  ring-offset-2 rignt' fill src={records[0].profileImageUrl} alt='' /></div>
        
         <div>
         <div className="name text-[#0B59A1] text-[22px] font-bold leading-6 tracking-normal">{records[0].name}  </div>
         <div className="job text-gray-400 text-[18px]">{records[0].job} </div>
         </div>

          

     </div>  

   </div>



    <div className=''>
    <hr className="border-t border-gray-200 mt-[2%]" />
    <div className="pt-[4%] pl-[5%] w-[96%]">
    <span className="text-[30px] font-bold text-red-600  ">{records[0].about}</span>
  </div>
  <div className="pl-[5%] w-[96%]">
    <span className="text-gray-300 text-[22px]  ">{records[0].createdAt.toString().split('T')[0]}</span>
  </div>

     <div className=''>
      <div className='w-full'>
      <h2 className="text-[30px] font-bold text-[#0B59A1] pt-[3%] pl-[5%]">CONTENU :</h2>
      <p className=" text-[22px] font-normal text-gray-700 pt-[3%] pl-[5%] pr-[5%] "> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
       {records[0].description}</p>

       </div>
       <h2 className="text-[30px] font-bold text-[#0B59A1] pt-[3%] pl-[5%]" >PIECE JOINTES :</h2>

       <div className='  py-8 w-[80%]  gap-4 sm:gap-auto grid grid-cols-1 sm:grid-cols-4 justify-center items-center'>
        {loadingPics ? <p>Loading ...</p> : pics.map((pic,index)=>{
           return           <div onClick={()=>{setSlider(true) ;setActiveIndex(index)}} key={index} className='pl-[30%]  cursor-pointer'>
    <div  className=' w-40  relative   h-40'><Image src={pic.image_url} className='rounded ring-1 ring-offset-[3px] ring-zinc-400' alt='' fill/></div>
            </div>

        })}
          
          
        
       </div>

        </div>
      </div>
      {plusDinfo ? null : (
      <div className="flex justify-end w-[90%] pt-[4%] pb-[4%] " >
     <button onClick={handleplusDinfoClick}
     className="rounded-md font-bold text-white py-2 px-4 text-center bg-red-600">Plus d'informations</button>
       </div>)}

       {plusDinfo ? (
        <>
  
      <div className='w-full'>
       <span className="text-[30px] font-bold text-[#0B59A1] pt-[3%] pl-[5%]">Status :</span>
       <span className=" text-[22px] font-normal text-gray-700 pt-[3%] pl-[5%] pr-[5%] ">  &nbsp;
       {records[0].status}</span>
       </div>

       {isRejected ? (
       <div className='w-full'>
        <h2 className="text-[30px] font-bold text-[#0B59A1] pt-[3%] pl-[5%]">Motif de refus :</h2>
        <p className=" text-[22px] font-normal text-gray-700 pt-[3%] pl-[5%] pr-[5%] "> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
       {records[0].manager_motif}</p>
       </div> ) : null}

       {isApproved ? (
       
       <div className="h-full pl-[5%]">
      
       
           <p className="text-[30px] font-bold text-[#0B59A1] pt-[3%]"> Facture </p>

           <div className=" flex">
           <label className="mt-[2%] text-[22px] block text-primary font-bahnschrift font-bold text-[#0B59A1]">
           .ID de la facture: </label>
           <label className="mt-[2%] ml-[3%] text-[22px] font-bahnschrift font-normal text-gray-700">
           {records[0].id}</label>
           </div>

            <label className="mt-[2%] text-[22px] block text-primary font-bahnschrift font-bold text-[#0B59A1]"
            >.Pour l'employé :</label>
            
            <div className="ml-[3%] flex">
           <label className="mt-[2%] text-[22px] font-bahnschrift font-bold text-[#FF3548]">
           .Nom: </label>
           <p className="mt-[2%] ml-[3%] text-[22px] font-bahnschrift font-normal text-gray-700">
           {records[0].name}</p >
           </div>

           <div className="ml-[3%] flex">
           <label className="mt-[2%] text-[22px] text-[#FF3548] font-bahnschrift font-bold ">
           .Occupation: </label>
           <label className="mt-[2%] ml-[3%] text-[22px] font-bahnschrift font-normal text-gray-700">
           {records[0].job}</label>
           </div>

           <div className=" flex">
           <label className="mt-[2%] text-[22px] block  font-bahnschrift font-bold text-[#0B59A1]">
           .Service de rembourssement: </label>
           <label className="mt-[2%] ml-[3%] text-[22px] font-bahnschrift font-normal text-gray-700">
           Service </label>
           </div>

           <div className=" flex">
           <label className="mt-[2%] text-[22px] block font-bahnschrift font-bold text-[#0B59A1]">
           .Montant de rembourssement: </label>
           <label className="mt-[2%] ml-[3%] text-[22px] font-bahnschrift font-normal text-gray-700">
           {records[0].montant} DZ</label>
           </div>

       
        
        <div className="ml-[3%] flex">
           <label className="mt-[2%] text-[22px] font-bahnschrift font-bold text-[#FF3548]">
           .Email : </label>
           <label className="mt-[2%] ml-[3%] text-[22px] font-bahnschrift font-normal text-gray-700">
           {records[0].reviewedBy}</label>
           </div>        

       </div>
       
       
       ) : null}

       <div className="flex justify-end w-[90%] pt-[4%] pb-[4%] " >
     <button onClick={handlefermerClick}
     className="rounded-md font-bold text-white py-2 px-4 text-center bg-red-600">Moins d'information</button>
       </div>
      </>) : null}

      </div>

 )}