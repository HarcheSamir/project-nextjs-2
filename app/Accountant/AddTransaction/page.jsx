'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import {RiImageAddFill} from 'react-icons/ri'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCheckCircle,AiFillFileAdd ,  AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";

function getStatusColor(status) {
  switch (status) {
    case 'pending':
      return 'text-yellow-500'; // Apply yellow color
    case 'completed':
      return 'text-green-500'; // Apply green color
    case 'rejected':
      return 'text-red-500'; // Apply red color
      case 'archive':
      return 'text-blue-500';
    default:
      return ''; // No specific color class for other statuses
  }
}

export default function Page() {
  const [done ,setDone] = useState(false) ;

  const [isLoadingButton, setLoadingButton] = useState(false) ;
  const router = useRouter();
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [pressed ,setPressed] = useState(false)
  const handleRequestSelection = (request) => {
    if (selectedRequests.includes(request)) {
      setSelectedRequests(selectedRequests.filter((selectedRequest) => selectedRequest !== request));
    } else {
      setSelectedRequests([...selectedRequests, request]);
    }
    };
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading1(true);
      const { data } = await axios.get("https://server-social-benefits.vercel.app/searchFilter", {
        params: {
          accountant_review:'approved' ,
          status : 'completed' ,
          page: pagination.currentPage || 1,
          limit: 10,
        },
      });
      setRecords(data.records);
      setPagination(data.infos);
      setLoading1(false);

    }
    fetchData();
  }, [query, pagination.currentPage]);



  function handlePageClick(data) {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: data.selected + 1,
    }));
  }


  
  return (
    <div className="w-[95%] flex items-center flex-col ">

{pressed && 
<div className="absolute w-screen h-screen z-40 bg-black/80 top-0 left-0">
<div className="relative w-screen top-0 left-0 h-screen ">
  <div className="sm:w-[50%] w-[80%] absolute  overflow-hidden bg-white flex h-1/2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex-col">
  <div className="flex bg-white/95 z-10 items-cener px-4 pt-4 mx-4 py-2 border-b-[1px]   border-p-8 border-zinc-700 w-full sticky top-0">
<p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold  text-zinc-700 ">#</p>
<p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-zinc-700  ml-2">Objet</p>
<p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold  text-zinc-700  ml-2">Status</p>
<p className="md:w-[30%] hidden md:block  cursor-default text-sm font-bold  text-zinc-700 ml-2">Demandé par</p>
      </div>






      <div className="flex flex-col w-full  ">
      {loading1 && (
            <div className="w-full h-16 rounded-lg px-4 mx-4 relative mt-1 items-center flex justify-center">
              <p>Loading...</p>
            </div>
          )}
    {!loading1 && records.map((request, index) => (
  <div key={index} className="w-full h-16 rounded-lg hover:bg-blue-200 hover:scale-[101%] mb-1 px-4 mx-4 relative mt-1 items-center flex">
    <input
      type="checkbox"
      onChange={() => handleRequestSelection(request)}
      checked={selectedRequests.includes(request)}
      className="mr-2"
    />
    <p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold text-zinc-700">{index + 1 + (pagination.currentPage - 1) * 10}</p>
    <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold text-zinc-700 ml-2">{request.about}</p>
    <p className={`md:w-[30%] w-[50%] cursor-default text-sm font-bold ml-2 ${getStatusColor(request.status)}`}>{request.status}  <span className="text-xs text-zinc-700"> - {new Date(request.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}</span> </p>
    <div className="md:w-[30%] md:flex flex-row hidden items-center justify-start cursor-default text-sm font-bold text-zinc-700 ml-2">
      <div className="h-10 aspect-square relative">
        <Image fill alt='' src={request.profileImageUrl} className="rounded-full flex-none ring-[2px] ring-zinc-500 ring-offset-2 mr-4"/>
      </div>
      <p className="grow ml-4">{request.name}</p>
    </div>
  </div>
))}
      </div>


     <div className="w-[95%] mt-10 flex flex-col ">
        <ReactPaginate
           pageCount={pagination.totalPages || 1}
           onPageChange={handlePageClick}
           containerClassName="pagination flex justify-center py-4"
           pageClassName="page-item px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
           activeClassName="active bg-blue-500 text-white"
           previousClassName="page-item px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
           nextClassName="page-item px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
           disabledClassName="disabled"
           previousLabel="Previous"
           nextLabel="Next"
           breakLabel="..."
           breakClassName="page-item px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
           marginPagesDisplayed={2}
           pageRangeDisplayed={5}
           initialPage={pagination.currentPage - 1}
        />
      </div>
  </div>
  <button onClick={()=>{setPressed(false) ;console.log(selectedRequests) ;}} className="px-8 py-2 bg-green-500 text-white text-sm text-bold absolute top-8 right-8 rounded-md">
    Done
  </button>
</div>
</div> }
    

{done &&
<div className="w-screen absolute top-0 left-0 z-50  bg-blue-900/30  h-screen">
    <div className="h-screen  relative w-screen ">
    <div className='md:w-[30%] w-[80%] rounded-xl overflow-hidden pb-4 absolute bg-white left-1/2 -translate-x-1/2 flex flex-col items-center top-1/2 -translate-y-1/2'>
        <div className='h-3/5 flex items-center justify-center bg-green-500 w-full top-0'>
          <AiOutlineCheckCircle className=' h-[50%] text-white  w-[50%]' />
        </div>
        <p className='font-bold text-2xl mt-2 font-mono  text-neutral-900'>Great!</p>
        <p className='text-sm font-bold w-full px-4 text-center text-zinc-700'>Success! The Transaction Was Registred Successfully. </p>
        <Link href='/Accountant'><button className='flex flex-row whitespace-nowrap items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 mt-4 rounded-full'><AiOutlineCheck className='w-5 text-white h-5'/>Done</button></Link>
      </div>
    </div>

</div>
 }

<div className="border-[3px] w-full   max-w-[50rem] pb-20 md:pb-auto mb-20 relative rounded p-8 border-neutral-300 ">
     <p className="md:text-5xl w-full text-center text-4xl font-mono font-bold mb-8 text-zinc-700 mt-8 md:ml-5">New Transaction </p>

   <Formik 
    initialValues={{
        images: [],amount :  undefined
      }}
      
      validationSchema={Yup.object({
        images: Yup.array().min(1, "Please select at least one image"),
        amount: Yup.number().required()
      })}
      onSubmit={(values, { setSubmitting }) => {
        setLoadingButton(true)
        const formData = new FormData();
       
        for (let i = 0; i < values.images.length; i++) {
          formData.append("pic", values.images[i]);
        }
        formData.append('amount', values.amount);
        for (let i = 0; i < selectedRequests.length; i++) {
          formData.append("id", selectedRequests[i].id);
        }
                axios
          .post("https://server-social-benefits.vercel.app/uploadTransaction", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            setSubmitting(false);
            setLoadingButton(false)
            setDone(true)

          })
          .catch((error) => {
            console.log(error);
            setSubmitting(false);
            setLoadingButton(false)
          });
      }}
    
    >
      {({ values,errors, touched , isSubmitting, setFieldValue ,handleBlur ,handleChange }) => (









        <Form id="my-form" className="mb-12  relative gap-2 grid grid-cols-2  " >

















<div className="flex flex-col  col-span-2  ml-2">

<p className="block  mb-2 font-bold text-[#0B59A1] mt-8 text-26px">Amount:</p>

<div className="relative  break-all py-2" >

  <div className="relative mt-2 w-full mb-3">
        <Field
          className={`${touched.email && errors.email ? 'error' : ''} peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
          name="amount"
          type="number"
          placeholder="Amount"
          onBlur={handleBlur}
         onChange={handleChange}
         value={values.amount}
        
        />
<label
    
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Amount</label
  >        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="amount" component="span"  />
      </div>


</div>


</div>

<div className="flex flex-col">
{selectedRequests.length>0 && <div>
  <div className="flex bg-white/95 z-10 items-cener px-4 pt-4 mx-4 py-2 border-b-[1px]   border-p-8 border-zinc-700 w-full sticky top-0">
<p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold  text-zinc-700 ">#</p>
<p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-zinc-700  ml-2">Objet</p>
<p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold  text-zinc-700  ml-2">Status</p>
<p className="md:w-[30%] hidden md:block  cursor-default text-sm font-bold  text-zinc-700 ml-2">Demandé par</p>
      </div>






      <div className="flex flex-col w-full  ">
      {loading1 && (
            <div className="w-full h-16 rounded-lg px-4 mx-4 relative mt-1 items-center flex justify-center">
              <p>Loading...</p>
            </div>
          )}
    {!loading1 && selectedRequests.map((request, index) => (
  <div key={index} className="w-full h-16 rounded-lg hover:bg-blue-200 hover:scale-[101%] mb-1 px-4 mx-4 relative mt-1 items-center flex">
    <input
      type="checkbox"
      onChange={() => handleRequestSelection(request)}
      checked={selectedRequests.includes(request)}
      className="mr-2"
    />
    <p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold text-zinc-700">{index + 1 + (pagination.currentPage - 1) * 10}</p>
    <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold text-zinc-700 ml-2">{request.about}</p>
    <p className={`md:w-[30%] w-[50%] cursor-default text-sm font-bold ml-2 ${getStatusColor(request.status)}`}>{request.status}  <span className="text-xs text-zinc-700"> - {new Date(request.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}</span> </p>
    <div className="md:w-[30%] md:flex flex-row hidden items-center justify-start cursor-default text-sm font-bold text-zinc-700 ml-2">
      <div className="h-10 aspect-square relative">
        <Image fill alt='' src={request.profileImageUrl} className="rounded-full flex-none ring-[2px] ring-zinc-500 ring-offset-2 mr-4"/>
      </div>
      <p className="grow ml-4">{request.name}</p>
    </div>
  </div>
))}
      </div>
  </div>}
<div className="flex  mb-2 font-bold text-[#0B59A1] mt-8 text-26px items-center gap-4" >Select Concerned Requests : <AiFillFileAdd className="w-6 h-6 cursor-pointer text-green-600" onClick={()=>{setPressed(true)}} /></div>

</div>



<div className="w-full mt-12 col-span-2 flex flex-col">
    <p className="text-zinc-700 font-bold mb-4 text-xl ml-4">Select Needed Documents :</p>
<div className="grid gap-2 ml-6 w-fit grid-cols-2 md:grid-cols-3">

{values.images && Array.from(values.images).map((image ,index) => (
<div key={index} className="w-20 md:w-40 shadow ring-zinc-400 ring-2 rounded overflow-hidden md:h-40 relative h-20">
<Image key={image.name} fill src={URL.createObjectURL(image)} alt="selected" className="rounded object-cover" />
<div className="absolute -top-0 -right-0">
        <button type="button" onClick={() => {
          const newImages = [...values.images];
          newImages.splice(index, 1);
          setFieldValue("images", newImages);
        }} >
          <IoMdCloseCircle className="md:w-12 w-8 h-8 md:h-12 text-red-500" />
        </button>
      </div>
</div>
))}

<div className=" aspect-square w-20 md:w-40  rounded border-[3px]  border-zinc-400  relative">
<RiImageAddFill className="md:h-16  h-10 w-10 text-zinc-400 md:w-16 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
<input
id="images"
name="images"
type="file"
accept=".png, .jpg, .jpeg"
onChange={(event) => {
const files = event.currentTarget.files;
const fileArray = Array.from(files);
setFieldValue("images", fileArray);
}}
className="opacity-0 cursor-pointer w-20 h-20 md:w-40 md:h-40 bg-red-900"
/>


</div>
</div>

<ErrorMessage name="images" component="span" className="text-red-500 ml-6 mt-2 text-xs error-message font-bold" />

</div>
         
        </Form>
      )}
    </Formik>

    <button onClick={()=>{console.log('clicked')}} disabled={isLoadingButton || selectedRequests.length==0}  form="my-form" type="submit"  className="bg-red-500 absolute md:bottom-5 md:right-16 md:left-auto md:translate-x-0 left-1/2 -translate-x-1/2 md:mt-5  text-white px-8 py-4 rounded">
  
  {isLoadingButton ? (
        <svg
          className="animate-spin mr-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : 'Submit'}
</button>
    </div>

    
    </div>
  );
}
