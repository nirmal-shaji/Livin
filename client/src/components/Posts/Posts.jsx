import React, { useEffect } from 'react'
import './Posts.css'

import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeline } from "../../redux/actions/postActions"
import { useParams } from "react-router-dom";
const Posts = () => {
   
    let { postData, fetchedPost, loading } = useSelector((state) => state.postReducer)
    
  
    const dispatch=useDispatch()
    useEffect(() => {
        
        dispatch(getTimeline(userData._id))
    }, [postData])
    const params = useParams()
    
    
    const {userData} = useSelector((state) => state.authReducer.authData)
    
    if(!fetchedPost) 
    return 'No Posts';
    if (params.id) {
     
        fetchedPost = fetchedPost.filter((post) => {
            // console.log(typeof (post.userId), "the")
            // console.log(typeof(params.id),"yessss")
            // post.userId = post.userId * 1
            
            // console.log(post.userId,"this is also wrang")
            if (post.userId === params.id) {
                //   console.log(post.userId,"this is wrang")
                 return post.userId
            }
              
        })
    }
 

    return (
        <div className="Posts">
            
            
            {loading? "Fetching posts...."
        : (fetchedPost.map((value) => {
                return <Post data={value} id={value._id} />
        }))}
        </div>
  )
}

export default Posts