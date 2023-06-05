'use client'
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FiSearch } from "react-icons/fi"; 
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Modal from 'react-modal'; 

function getStatusColor(amount) {
  switch (amount > 0 ) {
    case (true):
      return "text-green-500"; 
    case (false ):
      return "text-red-500"; 
    default:
      return "text-[#2C435A]";
  }
}

export default function Transactions() {

    function handleOpenModal(transaction) {
        setSelectedTransaction(transaction);
        console.log(transaction)
        if (transaction.t_type === 'crate') {
          setIsCrate(true);
          setIsRequest(false);
          console.log('crate')
        } else if (transaction.t_type === 'request') {
          setIsCrate(false);
          setIsRequest(true);
          console.log('request')
        }
      }
    
      function handleCloseModal() {
        setSelectedTransaction(null);
        setIsCrate(false);
        setIsRequest(false);
      }
    

    const [query, setQuery] = useState("");
    const [pagination, setPagination] = useState({ currentPage: 1 });
    const [loading, setLoading] = useState(false);
    const [isRequest, setIsRequest] = useState(false);
    const [isCrate, setIsCrate] = useState(false);
    const [Records, setRecords] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        async function fetchData() {
          setLoading(true);
          const { data } = await axios.get("https://server-social-benefits.vercel.app/transactions", {
            params: {
                page: pagination.currentPage || 1,
                limit: 10,
              },
          });
          console.log(data);
          setPagination(data.infos);
          setRecords(data.records);
          setLoading(false);
      }
      
        fetchData();
      }, [pagination.currentPage]);
      

   function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handlePageClick(data) {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: data.selected + 1,
    }));
  }

  const router = useRouter();
  
  return (
    <div className="w-[95%] ">

<div className="justify-center flex items-center">

  <div className="justify-center h-full w-[80%] max-w-[50rem] mt-[2%]">
    <input
      type="text"
      id="search"
      name="search"
      className="w-full border-gray-300 rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:border-[1px] focus:outline-none "
      placeholder="Recherche..."
      value={query}
      onChange={handleInputChange}
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiSearch className="h-5 w-5 text-gray-400" />
    </div>
  </div>
</div>


      <div className="flex bg-white/95 items-cener px-4 pt-4 mx-4 py-2 border-b-[1px] border-p-8 border-[#2C435A] w-full sticky ">
        <p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold  text-[#2C435A] ">#</p>
        <p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Service</p>
        <p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Montant</p>
        <p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Type</p>
        <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Date</p>
      </div>

      <div className="flex flex-col w-full  ">
        {loading && (
          <div className="w-full h-16 rounded-lg px-4 mx-4 relative mt-1 items-center flex justify-center">
            <p>Loading...</p>
          </div>
        )}
        {!loading &&
          Records.map((transaction, index) => (
            <div
              key={index}
              onClick={() => { handleOpenModal(transaction)} }
              className="w-full cursor-pointer h-16 rounded-lg hover:bg-blue-200 hover:scale-[101%] mb-1 px-4 mx-4 relative mt-1 items-center flex "
            >
              <p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold text-[#2C435A] "> {index + 1 + (pagination.currentPage - 1) * 10} </p>
              <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold text-[#2C435A] ml-2">{transaction.t_service_title}</p>
              <p className={`md:w-[30%] w-[50%] cursor-default text-sm font-bold ${getStatusColor(transaction.t_amount)} ml-2`}>{transaction.t_amount} {"  DA"}</p>
              <p className={`md:w-[30%] w-[50%] cursor-default text-sm font-bold } ml-2 text-[#2C435A] `}> {transaction.t_type=='crate' ? 'Division du budget' : "Acceptation d'une demande"}  </p>
              <p className={`md:w-[30%] w-[50%] cursor-default text-sm font-bold ml-2`}>
                <span className="text-sm text-[#2C435A]">
                {new Date(transaction.t_createdAt).toLocaleString("fr-FR", {
                year: "numeric",
                month: "long",
               day: "numeric",
               hour: "numeric",
                minute: "numeric"
                 })}                </span>
              </p>
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

      
        <Modal className="h-500 w-500 z-999" isOpen={selectedTransaction !== null} onClose={handleCloseModal}>
          {isCrate && (
            <>
              <h2>Crate Information</h2>
              <p>{selectedTransaction.t_service_title}</p>
              <p>{selectedTransaction.t_amount}</p>
            </>
          )}

          {isRequest && (
            <>
              <h2>Request Information</h2>
              <p>{selectedTransaction.t_service_title}</p>
              <p>{selectedTransaction.t_amount}</p>
            </>
          )}
        </Modal>
      

    </div>
  );
}
