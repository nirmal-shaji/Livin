import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import { useLocation,useParams } from 'react-router-dom'

import './PostSide.css'
import { useSelector } from 'react-redux'

const PostSide = () => {
  const params = useParams();
  const location = useLocation()
  const { userData } = useSelector((state) => state.authReducer.authData);
  return (
    <div className='PostSide'>
      {location.pathname==='/home'?<PostShare/>:""}
     { params.id===userData._id?<PostShare />:""}
      <Posts />
     
    </div>
  )
}

export default PostSide