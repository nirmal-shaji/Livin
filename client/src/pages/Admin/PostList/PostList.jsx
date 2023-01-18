import React from 'react'
import Layout from '../Layout/Layout'

import ColumGroupingTable from '../../../components/PostTable/PostTable'
import { postsList } from '../../../api/adminApi'
import { useEffect } from 'react'
import { useState } from 'react'
const PostList = () => {
const [postData,setPostData]=useState([])
  useEffect(() => {
    const postList = async() => {
       const {data} = await postsList();
    setPostData(data);
    }
    postList();
  
    
  }, [])
  
  return (
      <Layout>
      <ColumGroupingTable data={postData} />
  </Layout>
  )
}

export default PostList