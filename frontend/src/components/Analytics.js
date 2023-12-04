import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from '../utils/axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/booking/fetchbookings');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Process the data for the second chart (unique users and refunds)
  const uniqueUsersSet = new Set();
  let refundCount = 0;
  data.forEach((item) => {
    uniqueUsersSet.add(item.userId);
    if (item.isRefunded) {
      refundCount++;
    }
  });

  // Chart data for the second chart
  const userRefundChartData = {
    labels: ['Unique Users', 'Refunds'],
    datasets: [
      {
        label: 'Count',
        data: [uniqueUsersSet.size, refundCount],
        backgroundColor: [
          'rgba(128, 128, 0, 0.5)',
          'rgba(255, 165, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(0, 128, 128, 0.5)',
          'rgba(0, 0, 128, 0.5)',
          'rgba(0, 255, 255, 0.5)',
          'rgba(128, 128, 128, 0.5)',
          'rgba(255, 192, 203, 0.5)',
          'rgba(255, 0, 128, 0.5)',
          'rgba(75, 0, 130, 0.5)'
        ],
        borderColor: [
          'rgba(128, 128, 0, 1)',
          'rgba(255, 165, 0, 1)',
          'rgba(128, 0, 0, 1)',
          'rgba(0, 128, 128, 1)',
          'rgba(0, 0, 128, 1)',
          'rgba(0, 255, 255, 1)',
          'rgba(128, 128, 128, 1)',
          'rgba(255, 192, 203, 1)',
          'rgba(255, 0, 128, 1)',
          'rgba(75, 0, 130, 1)'
        ] ,
        borderWidth: 1,
      },
    ],
  };

  const titleCounts = data.reduce((acc, item) => {
    acc[item.title] = (acc[item.title] || 0) + 1;
    return acc;
  }, {});

  // Prepare the data for the title count chart
  const titleChartData = {
    labels: Object.keys(titleCounts),
    datasets: [
      {
        label: 'Number of Bookings per title',
        data: Object.values(titleCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(220, 20, 60, 0.5)',
          'rgba(0, 128, 0, 0.5)',
          'rgba(255, 69, 0, 0.5)',
          'rgba(128, 0, 128, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(220, 20, 60, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(255, 69, 0, 1)',
          'rgba(128, 0, 128, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const locationCounts = data.reduce((acc, item) => {
    acc[item.location] = (acc[item.location] || 0) + 1;
    return acc;
  }, {});

  // Prepare the data for the location count chart
  const locationChartData = {
    labels: Object.keys(locationCounts),
    datasets: [
      {
        label: 'Number of Bookings per location',
        data: Object.values(locationCounts),
        backgroundColor: [
          'rgba(0, 128, 128, 0.5)',
          'rgba(70, 130, 180, 0.5)',
          'rgba(0, 255, 0, 0.5)',
          'rgba(0, 0, 255, 0.5)',
          'rgba(255, 255, 0, 0.5)',
          'rgba(255, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(0, 128, 0, 0.5)',
          'rgba(255, 140, 0, 0.5)',
          'rgba(255, 0, 255, 0.5)'
        ],
        borderColor: [
          'rgba(0, 128, 128, 1)',
          'rgba(70, 130, 180, 1)',
          'rgba(0, 255, 0, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255, 255, 0, 1)',
          'rgba(255, 0, 0, 1)',
          'rgba(128, 0, 0, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(255, 140, 0, 1)',
          'rgba(255, 0, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options (can be shared or individual for each chart)
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-3/6 m-auto'>
      <Bar data={locationChartData} options={options} />
      <Bar data={titleChartData} options={options} />
      <Bar data={userRefundChartData} options={options} />
    </div>
  );
};

export default Analytics;
