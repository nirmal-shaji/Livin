import React from 'react'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { followUser,unfollowUser } from '../../redux/actions/userAction'
import coverPicture from "../../img/defaultProfile.png"
import { useNavigate } from 'react-router-dom'
const User = ({ person }) => {
  const navigate=useNavigate()
  const  {userData}  = useSelector((state) => state.authReducer.authData);
  const [following, setFollowState] = useState(person.followers.includes(userData._id))
  const dispatch = useDispatch();
  const id = person._id
 
  const handleFollow = () => {  

    
    following ?
      dispatch(unfollowUser(userData,id))
      : dispatch(followUser(userData, id))
      setFollowState((prev) => !prev);
  }
  return (
    <div className='follower'>
      <div onClick={() => {
        navigate(`/profile/${person._id}`)
  
    }}>
        <img src={person?.image?person.image:coverPicture} className='followerImage' alt='hi'/>
        <div className='name'>
          <span>{person.firstName} {person.lastName}</span>
            <span>@{person.userName}</span>
          
        </div>
    
    </div>
    <button className='button fc-button' onClick={handleFollow}>
        {following?"Unfollow":"follow"}
    </button>
   
</div>
  )
}

export default User