
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react'
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

const [activeTab, setActiveTab] = useState('tab-demandes');

function toggleTab(event, tabId) {

  setActiveTab(tabId);

  const tabButtons = document.querySelectorAll('[role="tab"]');
  const tabContents = document.querySelectorAll('.tab-content');

  tabContents.forEach((tabContent) => {
    tabContent.classList.add('hidden');
  });

  tabButtons.forEach((tabButton) => {
    tabButton.setAttribute('aria-selected', 'false');
  });

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.remove('hidden');
  }
  event.currentTarget.setAttribute('aria-selected', 'true');
}

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

useEffect(() => {
  async function fetchData() {
    setChartLoading(true);
    setLoading(true);
    const { data } = await axios.get("https://server-social-benefits.vercel.app/searchFilter", {
      params: {
        for: query,
        manager_review: 'approved',
        page: pagination.currentPage || 1,
        limit: 10,
      },
    });
  
    const currentYear = new Date().getFullYear();
    const approvedRequests = data.records.filter((request) => {
      
      const isApproved = request.status === 'completed';
      const isCurrentYear = new Date(request.completedAt).getFullYear() === currentYear;
      
      return isApproved && isCurrentYear;
    });
    
    console.log(approvedRequests);

    const totalAmount = approvedRequests.reduce(
      (sum, request) => sum + parseFloat(request.amount), 0);

    setChartTotal(totalAmount);


    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const monthlyAmounts = months.map((month) => {
      const amountForMonth = approvedRequests
        .filter((request) => new Date(request.completedAt).getMonth() === month - 1)
        .reduce((sum, request) => sum + parseFloat(request.amount), 0);
      return amountForMonth;
    });
    setChartData([
      {
        name: 'Dépenses',
        data: monthlyAmounts,
      },
    ]);

    setRecords(data.records);
    setPagination(data.infos);
    setLoading(false);
    const uniqueTitles = [...new Set(approvedRequests.map((request) => request.service_title))];
    setChartLabels(uniqueTitles);

    const chartValues = uniqueTitles.map((title) => {
      const requestsForTitle = data.records.filter((request) => request.service_title === title);
      const totalAmount = requestsForTitle.reduce((sum, request) => sum + parseFloat(request.amount), 0);
      const percentage = chartTotal !== 0 ? Math.floor((totalAmount / chartTotal) * 100) : 0;
      return percentage;
    });
    setChartValues(chartValues);
    setChartLoading(false);
  }

  fetchData();
}, [query, pagination.currentPage ,chartTotal]);

useEffect(() => {

 if (!chartLoading){
  const chartOptions = {
    series: chartValues,
    chart: {
      height: 250,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: '16px',
            fontWeight: 600,
            color: undefined,
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: '22px',
            fontWeight: 600,
            color: undefined,
            offsetY: 16,
            formatter: (val) => {
              return `${val}%`;
            },
          },
          total: {
            show: true,
            label: 'Dépenses',
            color: '#888',
            formatter: () => {
              return chartTotal.toFixed(2);
            },
          },
        },
      },
    },
    labels: chartLabels,
  };

  if (chartRef.current) {
    const chart = new ApexCharts(chartRef.current, chartOptions);
    chart.render();

    return () => {
      chart.destroy();
    };
  }
}
}, [chartData, chartLabels, chartTotal, chartLoading ,chartValues]);


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

    <div className='h-full w-full'>
    
</div>


  )
}

