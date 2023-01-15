import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/usersApi";
import coverPicture from "../../img/defaultProfile.png"
const Conversation = ({ data, currentUser }) => {

  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()

  useEffect(()=> {

    const userId = data.messages.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
      
        const  {data} = await getUser(userId)
        
         setUserData(data)
        //  dispatch({type:"SAVE_USER", data:data})
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [])
  return (
    <>
      <div className="follower conversation">
        <div>
          {/* {online && <div className="online-dot"></div>} */}
          <img
            src={userData?.userData.profilePicture?  userData.userData.profilePicture : coverPicture}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.userData.firstName} {userData?.userData.lastName}</span>
            {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
