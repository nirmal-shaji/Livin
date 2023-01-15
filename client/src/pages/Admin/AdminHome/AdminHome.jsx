import React,{useState,useEffect} from 'react'
import Layout from '../Layout/Layout'
import UsersList from '../UsersList/UsersList';
import { Alert } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { adminDashboard } from '../../../api/adminApi';
import { CChart } from '@coreui/react-chartjs'
// import CChart from '@coreui/react-chartjs'
// import { Table } from '@mui/material';
import ColumnGroupingTable from '../../../components/Table/Table';
import "./AdminHome.css"

function AdminHome() {
  const [userData,setUserData]=useState([])
  useEffect(async() => {
   const data=await adminDashboard()
    setUserData(data); 
   
  }, [])
  
  // const [userList, setUserList] = useState(false);

  return (
    <Layout setUserList>
    {/* {userList?<div><h1>hihih</h1></div>: */}
      <div>
          {/* <ColumnGroupingTable /> */}
          <CChart
  type="bar"
  data={{
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'  ],
    datasets: [
      {
        label: 'Users Count',
        backgroundColor: '#blue',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
      },
    ],
  }}
  labels="months"
/>
      </div>
    </Layout>
  )
}

export default AdminHome
