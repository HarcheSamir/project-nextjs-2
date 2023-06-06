
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect} from 'react'
import React from 'react'
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { FiSearch } from 'react-icons/fi';
import Image from "next/image";
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('apexcharts'), { ssr: false });
import Loading from '@/components/Loading.js';
import Transactions from '@/components/transactions';


export default function Page() {

  return (

    <div className='h-full w-full'>
    
</div>


  )
}

