import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Statistics = () => {
  const [month, setMonth] = useState("March");
  const [monthselected,setMonthselected]=useState();

  const [category,setCategory]=useState({});
  const [barchart,setBarchart]=useState({});
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const transaction= async()=>{
    try {
      const data=await axios.get(`http://localhost:8080/api/v2/auth/piechart/${month}`);
      setMonthselected(data.data.data.Monthselected);
      
      setCategory(data.data.data.Category);
      console.log(category);
      setBarchart(data.data.data.Barchart);
      console.log(data.data.data.Barchart)
    } catch (error) {
      console.log(error)
    }
    }

    useEffect(()=>{
      transaction();
    }
    ,[month])



    const data = {
      labels: ['0-100', '100-200', '200-300', '300-400', '400-500', '500-600','600-700','700-800','800-900','900 above'],
      datasets: [
        {
          label: 'Sales',
          data: barchart,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };
  








  return (
    <Layout>
      <div className='flex justify-between p-10'>
      <h1 className='font-bold text-2xl'>Statistics - {month}</h1>
        <select value={month} onChange={(e)=>{setMonth(e.target.value)}} className='font-bold w-40 h-10' >
          {months.map((e)=>(
            <option value={e}>{e}</option>
          ))}
        </select>
      </div>
      <div className='flex justify-center items-center h-96'>
            <table className='w-80 font-bold bg-orange-300 h-52'>
              <tr>
                <td className='pl-5'>Total Sales</td>
                <td className='pl-5'>{monthselected?.saleamount}</td>
              </tr>
              <tr>
                <td className='pl-5'>Total Sold Items</td>
                <td className='pl-5'>{monthselected?.solditems}</td>
              </tr>
              <tr>
                <td className='pl-5'>Total Not Sold Items</td>
                <td className='pl-5'>{monthselected?.notsolditems}</td>
              </tr>
            </table>
      </div>

<Bar data={data}/>


    </Layout>
  )
}

export default Statistics