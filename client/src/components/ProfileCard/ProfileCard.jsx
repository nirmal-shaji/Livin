import React from 'react'
import Cover from '../../img/cover.webp'
import Profile from '../../img/profileImg.jpg'
import Comment from "../../img/comment.png";
import { createChat } from '../../api/usersApi';
import './ProfileCard.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import coverPicture from "../../img/defaultProfile.png"

const ProfileCard = ({location}) => {
    const params = useParams()
  
    const { userData } = useSelector((state) => state.authReducer.authData);
    const { users } = useSelector((state) => state.authReducer)
    let userProfile
   
    if (params.id) {
  
        if (params.id === userData._id) {
         userProfile=userData 
        }
        else {
            userProfile=users.find((value)=>value._id===params.id)
        }
    }
    else {
   
        userProfile=userData
    }
    
    const data = useSelector((state) => state.postReducer.fetchedPost)
    
const navigate=useNavigate()
const handleChat = async (data) => {

    await createChat(data)  
    navigate('/chat')
    
}
  return (
      <div className='ProfileCard'>
          <div className='ProfileImages'>
              <div className={location === "profilePage" ?"CoverImage Cover":"CoverImage"}>
                  <img src={userProfile.coverPicture?userProfile.coverPicture:coverPicture} alt="" /> 
              </div>
              <div className={location === "profilePage" ?"ProfileImage ProfileSection":"ProfileImage"}>
                <img src={userProfile.profilePicture?userProfile.profilePicture:coverPicture} alt="" />  
             </div>
              
              
          </div>
          <div className='ProfileName'>
              <span>{userProfile.firstName} {userProfile.lastName}</span>
              {userData._id === userProfile?._id ? "" : <span onClick={() => {
                  const data = {
                      senderId: userData._id,
                      receiverId:userProfile._id
                  }
                  handleChat(data);

              }}><img src={Comment} alt="" /></span> }
              {/* <span>Senior Web Developer</span> */}
          </div>
          <div className='FollowStatus'>
              <hr />
              <div>
                  <div className='Follow'>
                      <span>{ userProfile.following.length}</span>
                      <span>Followings</span>
                     
                  </div>
                  <div className='Vl'></div>
                  <div className='Follow'>
                      <span>{userProfile.followers.length}</span>
                      <span>Followers</span>
                  </div>
                  {location === "profilePage" && (
                      <>
                          <div className="Vl">
                              
                          </div>
                          <div className="Follow">
                              <span>{data.filter((value)=>value.userId===userProfile._id).length}</span>
                              <span>Posts</span>
                          </div>
                      </>
                  )}
              </div>
              <hr />
          </div>
          {location === "profilePage" ? (
              ""
          ) : (
              <span>
                  <Link to={`/profile/${userData._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      My Profile
                  </Link>
              </span>
          )}
        
          
          
    </div>
  )
}

export default ProfileCard