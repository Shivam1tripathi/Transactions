import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout';
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const Home = () => {
const [transactions,setTransactions]=useState([]);
const [search,setSearch]=useState("");
const [page, setPage] = useState(1);
const [month, setMonth] = useState("March");

const transaction= async()=>{
try {
  const data=await axios.post(`http://localhost:8080/api/v2/auth/search/${page}`,{search,month});
  console.log(data.data)
  setTransactions(data.data);
} catch (error) {
  console.log(error)
}
}


 


useEffect(()=>{
  transaction();
}
,[search,page,month])



  return (
    <Layout>
      
      <div className='h-52 flex justify-center items-center'>
        <h1 className='font-extrabold text-3xl flex-wrap bg-white rounded-full h-48 flex justify-center items-center p-4 w-48'>Transaction Dashboard</h1>
      </div>
      <div className=' p-10 flex justify-between'>
        <input onChange={(e)=>{setSearch(e.target.value)}} className='w-56 h-7 rounded-md mr-1 pl-2 font-semibold' type="text" placeholder='Search transaction' />
        <select value={month} onChange={(e)=>{setMonth(e.target.value)}} className='font-bold w-40 h-10' >
          {months.map((e)=>(
            <option value={e}>{e}</option>
          ))}
        </select>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <table className='bg-orange-300 rounded-lg'>
          <tr className='border-2 border-black'>
            <th className='p-2 border-2 border-black'>Id</th>
            <th className='p-2 border-2 border-black'>Title</th>
            <th className='p-2 border-2 border-black'>Description</th>
            <th className='p-2 border-2 border-black'>Price</th>
            <th className='p-2 border-2 border-black'>Category</th>
            <th className='p-2 border-2 border-black'>Sold</th>
            <th className='p-2 border-2 border-black'>Image</th>
          </tr>
          {
            transactions?.map((e)=>(
          <tr className='border-2 border-black'>
            <th className='p-2 border-2 border-black'>{e.id}</th>
            <th className='p-2 border-2 border-black'>{e.title.substring(0,20)}...</th>
            <th className='p-2 border-2 border-black'>{e.description.substring(0,30)}....</th>
            <th className='p-2 border-2 border-black'>{e.price}</th>
            <th className='p-2 border-2 border-black'>{e.category}</th>
            <th className='p-2 border-2 border-black'>{e.sold}</th>
            <th className='p-2 border-2 border-black'><img src={e.image} alt='transaction' width={"40px"} /></th>
          </tr>
            ))
          }
        </table>
        <div className='mt-4 mb-4 flex justify-between w-72'>
          <button className='font-bold text-xl' onClick={()=>{
            if(page>1){
            setPage(page-1)
            }
            }}>Prev</button>
          <h2 className='font-bold'>Page {page}</h2>
          <button onClick={()=>{
            setPage(page+1)
            }} className='font-bold text-xl'>Next</button>
        </div>
      </div>
    </Layout>
  )
}

export default Home