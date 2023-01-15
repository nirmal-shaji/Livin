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
 
  useEffect(async() => {
    const {data} = await userList()
    console.log(data,"this is users list ")
    setUserData(data.usersList);
   
   }, [pageReload])
  
  // const [users, setUsers] = useState([]);
  // const dispatch = useDispatch();

  // const handleUserStatus = async (id) => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await ADMIN_PUT(`/${id}`);
  //     dispatch(hideLoading());
  //     if (response.data.status) {
  //       setUsers((users)=>
  //           users?.map((user)=>{
  //               if(user._id === id){
  //                   return ({
  //                       ...user,
  //                       isBlocked:response.data.data.isBlocked ? true : false,
  //                   })
  //               }
  //               return user;
  //           })
  //       )
  //     }
  //   } catch (error) {
  //       dispatch(hideLoading());
  //       console.log(error);
  //       toast.error(error.response.data.message);
  //   }
  // };
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       dispatch(showLoading());
  //       const response = await ADMIN_GET("getusers");
  //       dispatch(hideLoading());
  //       if (response.data.status) {
  //         setUsers(response.data.data);
  //       } else {
  //         console.log(response);
  //         toast.error(response.data.message);
  //       }
  //     } catch (error) {
  //       dispatch(hideLoading());
  //       console.log(error);
  //       toast.error(error.response.data.message);
  //     }
  //   })();
  // }, []);
  return (
    <Layout>
 
      <ColumnGroupingTable data={userData} setPageReload={setPageReload}/>
     
    </Layout>
  );
}

export default UsersList;
