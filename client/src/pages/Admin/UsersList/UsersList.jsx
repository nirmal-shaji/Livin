import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userList } from "../../../api/adminApi";
import "./UsersList.css";
// import { hideLoading, showLoading } from "../../../redux/alertSlice";
import toast from "react-hot-toast";
// import { ADMIN_GET, ADMIN_PUT } from "../../../axios";
import Layout from "../Layout/Layout";
import ColumnGroupingTable from "../../../components/Table/Table";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonOffIcon from "@mui/icons-material/PersonOff";

function UsersList() {
  const [userData, setUserData] = useState([]);
  const [pageReload, setPageReload] = useState(false);
 
  useEffect(() => {
    const userLis = async() => {
       const {data} = await userList()
   
    setUserData(data.usersList);
    }
   
    userLis();
   }, [pageReload])
  

  return (
    <Layout>
 
      <ColumnGroupingTable data={userData} setPageReload={setPageReload}/>
     
    </Layout>
  );
}

export default UsersList;
