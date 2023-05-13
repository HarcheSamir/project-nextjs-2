'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'next/navigation';
import Image from "next/image";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);


  const [account, setAccount] = useState(null);
  const[Loadingfetch,setLoadingfetch] = useState(true) ;

  useEffect(() => {
      axios.get('https://server-social-benefits.vercel.app/accounts', {
        params: {
          email: id
        }
      })
      .then((response) => {
        setAccount(response.data[0]);
        console.log(response.data[0])      ; 
        setLoadingfetch(false)
      })
      .catch((error) => {
        console.error(error);
      });
    }, [id]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await axios.get("https://server-social-benefits.vercel.app/requests", {
        params: {
          requestedBy: id,
          page: pagination.currentPage || 1,
          limit: 10,
        },
      });
      setRecords(data.records);
      setPagination(data.infos);
      setLoading(false);

    }
    fetchData();
  }, [query, pagination.currentPage ,id]);

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handlePageClick(data) {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: data.selected + 1,
    }));
  }

if(Loadingfetch) return (<p>Loading...</p>)
  return (
    <div className="w-[95%] flex flex-col ">


<p className="text-6xl font-mono font-bold text-zinc-700 mt-16 ml-5">Demandes :</p>

<div className="sticky bg-white top-0 z-10">
<div className="flex mt-5 bg-white   items-start ml-6 w-full aspect-[3/1] md:aspect-[5/1] lg:aspect-[9/1]">
<div className="h-[70%]   mr-2  flex-none relative aspect-square"><Image alt="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" fill className="rounded-lg ring-2 ring-offset-[3px] ring-zinc-500" src={account?.profileImageUrl || 'https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'} /> </div>
<div className="flex w-full grow mt-2  h-full  flex-col "> 
<p className="text-ellipsis w-[70%] font-bold text-3xl font-mono text-zinc-700 overflow-hidden">{account?.name}</p> 
<p className="text-xs text-zinc-400  text-ellipsis font-bold ml-2 w-[70%] overflow-hidden ">{account?.email}</p>
</div> 
</div>
    



      <div className="flex bg-white/95 z-10 items-cener px-4 pt-4 mx-4 py-2 border-b-[1px]   border-p-8 border-zinc-700 w-full ">
<p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold  text-zinc-700 ">#</p>
<p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-zinc-700  ml-2">Objet</p>
<p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold  text-zinc-700  ml-2">Status</p>
<p className="md:w-[30%] hidden md:block  cursor-default text-sm font-bold  text-zinc-700 ml-2">Demandé par</p>
      </div>
</div>







      <div className="flex flex-col w-full  ">
      {loading && (
            <div className="w-full h-16 rounded-lg px-4 mx-4 relative mt-1 items-center flex justify-center">
              <p>Loading...</p>
            </div>
          )}
          {!loading && records.map((request, index) => (
            <div key={index} className="w-full h-16 rounded-lg hover:bg-blue-200 hover:scale-[101%] group/item mb-1 px-4 mx-4 relative mt-1 items-center flex ">
              <p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold text-zinc-700 "> {index + 1 + (pagination.currentPage - 1) * 10}</p>
              <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold text-zinc-700 ml-2">{request.about}</p>
              <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold text-zinc-700 ml-2">{request.status}</p>
              <p className="md:w-[30%] hidden md:block cursor-default text-sm font-bold text-zinc-700 ml-2">{request.requestedBy}</p>
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
  );
}
