import React from "react";
import { Home } from "./pages/home/Home";
import Chat from "./pages/Chat/Chat"
import "./App.css"
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";
import AdminHome from "./pages/Admin/AdminHome/AdminHome"
import UsersList from "./pages/Admin/UsersList/UsersList";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";

import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostList from "./pages/Admin/PostList/PostList";
function App() {
  
  const userData = useSelector((state) => state.authReducer.authData);
  const adminData = useSelector((state) => state.adminAuthReducer.adminData);

  return (
    <BrowserRouter>
    <div className="App">
  
        <Routes>
        <Route path='/auth' element={ userData?<Home />:<Auth />} />
          <Route path='/profile' element={userData ? <Profile /> : <Auth />} />
          <Route path='/profile/:id' element={userData?<Profile/>:<Auth/>} />
          <Route path='/' element={userData ? <Home /> : <Auth />} />
          <Route path='/chat' element={userData ? <Chat /> : <Auth />} />
          <Route path='/admin' element={adminData? <AdminHome /> : <AdminLogin />} />
          <Route path='/admin/users' element={adminData ? <UsersList /> :<AdminLogin/>} />
          <Route path='/admin/posts' element={adminData ? <PostList/> : <AdminLogin />} />
          
          
      </Routes>
    

       
   
    </div>
    </BrowserRouter>
  );
}

export default App;
