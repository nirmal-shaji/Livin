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
  const [userData, setUserData] = useState([])

  useEffect( () => {
    const dash = async () =>{
    const { data } = await adminDashboard()
  
      setUserData(data);
    }
    dash();
   
  }, [])
 

  
  // const [userList, setUserList] = useState(false);

  return (
    <Layout setUserList>
    {/* {userList?<div><h1>hihih</h1></div>: */}
      <div style={{"display":"flex","justifyContent":"space-between"}}>
          {/* <ColumnGroupingTable /> */}
          <div style={{"width":"45%",}}>
              <CChart 
              height={200}
  type="bar"
  data={{
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'  ],
    datasets: [
      {
        label: 'Users Count',
        backgroundColor: '#blue',
        data: userData.userCount
      },
    ],
  }}
  labels="months"
        />
          </div>
          <div style={{"width":"45%"}}>
             <CChart
              height={200}
  type="line" 
  data={{
    labels:   ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'  ],
    datasets: [
   
      {
        label: "Post Count",
        backgroundColor: "rgba(151, 187, 205, 0.2)",
        borderColor: "rgba(151, 187, 205, 1)",
        pointBackgroundColor: "rgba(151, 187, 205, 1)",
        pointBorderColor: "#fff",
        data: userData.postCount
      },
    ],
  }}
/>
          </div>
        
       
      </div>
    </Layout>
  )
}

export default AdminHome
