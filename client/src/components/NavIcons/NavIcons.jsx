import React from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";


const NavIcons = () => {
  const navigate = useNavigate()
  return (
    <div className="navIcons">
      <Link to="/">
        <img src={Home} alt="" />
      </Link>
      <UilSetting />
      <img src={Noti} alt="" />


      <img src={Comment} alt="" onClick={() => navigate('/chat')} />

    </div>
  );
};

export default NavIcons;
