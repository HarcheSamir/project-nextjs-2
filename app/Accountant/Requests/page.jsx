
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect} from 'react'
import React from 'react'
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { FiSearch } from 'react-icons/fi';
import Image from "next/image";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Loading from '@/components/Loading.js';
import Transactions from '@/components/transactions';


export default function Page() {


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

//fcts des charts 

const chartRef = useRef(null);

const [chartData, setChartData] = useState([
  {
    name: 'Dépenses',
    data: [0, 200, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0]
  }
]);

const [chartLabels, setChartLabels] = useState([]);
const [chartValues, setChartValues] = useState([null]);
const [chartTotal, setChartTotal] = useState(0);
const [chartLoading, setChartLoading] = useState(true);

const router = useRouter();

const [query, setQuery] = useState("");
const [records, setRecords] = useState([]);
const [pagination, setPagination] = useState({});
const [loading, setLoading] = useState(false);



  return (

    <div className='h-full w-full'>
    
</div>


  )
}

