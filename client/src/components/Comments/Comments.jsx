import "./Comments.css";
import React from "react";
import { UilCommentAdd } from "@iconscout/react-unicons";
import { addComment } from "../../api/postApi";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";


const override = {
  display: "block",
  margin: "0 auto",
};

const Comments = ({ postId,setCommentLoad }) => {
  const comment = useRef('');
  const [addComments,setAddComment]=useState('')
  const {userData}=useSelector((state)=>state.authReducer.authData)
const addNewComment = async() => {
  const data = {
    userId: userData._id,
    comments:addComments
  }
 
 await addComment(data,postId)
  setAddComment('')
  setCommentLoad(true);
}


  return (
    <div className="comments">


      <div className="comment-box">
        <input
          type="text"
          value={addComments}
          placeholder="write your comment"
          onChange={(e) => {
            console.log(e.target.value);
            setAddComment(e.target.value)
          }}
          
        />
    
        <div onClick={addNewComment}>
          <UilCommentAdd />
        </div>
      </div>
    </div>
  );
};

export default Comments;
