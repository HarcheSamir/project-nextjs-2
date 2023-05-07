'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FiSearch } from 'react-icons/fi';

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await axios.get("https://server-social-benefits.vercel.app/searchRequests", {
        params: {
          for: query,
          page: pagination.currentPage || 1,
          limit: 10,
        },
      });
      setRecords(data.records);
      setPagination(data.infos);
      setLoading(false);

    }
    fetchData();
  }, [query, pagination.currentPage]);

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handlePageClick(data) {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: data.selected + 1,
    }));
  }

  return (
    <div className="w-[95%] flex flex-col ">


<p className="text-6xl font-mono font-bold text-zinc-700 mt-16 ml-5">Demandes :</p>
     <div className="mb-4 mt-4 justify-between flex items-center w-full ">




      <div className="relative h-full w-[80%] max-w-[50rem]">
        <input
          type="text"
          id="search"
          name="search"
          className="w-full  border-gray-300 rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:border-[1px] focus:outline-none "
          placeholder="Search requests"
          value={query}
          onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
      </div>




      </div>



      <div className="flex bg-white/95 z-10 items-cener px-4 pt-4 mx-4 py-2 border-b-[1px]   border-p-8 border-zinc-700 w-full sticky top-0">
<p className="sm:w-[3%] w-[5%] cursor-default text-sm font-bold  text-zinc-700 ">#</p>
<p className="sm:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-zinc-700  ml-2">Objet</p>
<p className="sm:w-[30%] w-[50%] cursor-default text-sm font-bold  text-zinc-700  ml-2">Status</p>
<p className="sm:w-[30%] hidden sm:block  cursor-default text-sm font-bold  text-zinc-700 ml-2">Demandé par</p>
      </div>






      <div className="flex flex-col w-full  ">
      {loading && (
            <div className="w-full h-16 rounded-lg px-4 mx-4 relative mt-1 items-center flex justify-center">
              <p>Loading...</p>
            </div>
          )}
          {!loading && records.map((request, index) => (
            <div key={index} className="w-full h-16 rounded-lg hover:bg-blue-200 hover:scale-[101%] group/item mb-1 px-4 mx-4 relative mt-1 items-center flex ">
              <p className="sm:w-[3%] w-[5%] cursor-default text-sm font-bold text-zinc-700 "> {index + 1 + (pagination.currentPage - 1) * 10}</p>
              <p className="sm:w-[30%] w-[50%] cursor-default text-sm font-bold text-zinc-700 ml-2">{request.about}</p>
              <p className="sm:w-[30%] w-[50%] cursor-default text-sm font-bold text-zinc-700 ml-2">{request.status}</p>
              <p className="sm:w-[30%] hidden sm:block cursor-default text-sm font-bold text-zinc-700 ml-2">{request.requestedBy}</p>
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
