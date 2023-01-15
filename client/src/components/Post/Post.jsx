import React, { useState } from 'react'
import './Post.css'
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png";
import Comments from '../Comments/Comments'
import coverPicture from "../../img/defaultProfile.png"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import { savePost } from '../../api/usersApi'
import { likePost } from '../../api/postApi'
import zIndex from '@mui/material/styles/zIndex'
import Report from '@mui/icons-material/Report'
import { allComment } from '../../api/postApi'

const Post = ({ data, id }) => {
  
  const { userData } = useSelector((state) => state.authReducer.authData);
  const [showComments, setShowComments] = useState([]);
  const [liked, setLiked] = useState(data.likes.includes(userData._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [report, setReport] = useState(false);
  const [commentLoad, setCommentLoad] = useState(false);
  const [commentLoads, setCommentLoads] = useState(false);


  const savePosts = async () => {
    console.log(userData._id)
    await savePost(id,userData._id);
 } 

  const allComments = async() => {
    console.log("this function is being loaded")
   
    const {data} = await allComment(id);
    console.log(data, "this is datat")
    setCommentLoad(false);
    setShowComments(data.comments)
   
  }
   
  commentLoad && allComments()

  const handleLike = () => {
    console.log("reached here")
    likePost(data._id, userData._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };
  console.log(showComments)
  return (
    <div className="Post">
      <div className="detail" style={{ "display": "flex", "justifyContent": "space-between", "paddingBottom": "3px" }}>
        <div>
          <span><img style={{ "width": "20px", }} src={data?.userName?.profilePicture ? data?.userName?.profilePicture : coverPicture} alt="" />  </span>
          <span>{data.userName ? data.userName : userData.userName}</span>
        </div>
        <div>
          <span className='icon' style={{}} onClick={() => {
            setReport(!report)
          }}><MoreVertIcon /> </span>
        </div>





      </div>
      {report ? <div className='Report' >
        <div >
          <div onClick={savePosts}><SaveAltIcon /> Save later</div>
          <div><Report /> Report this post!</div>

        </div>
      </div> : ""}



      <img src={data.imageUrl} alt="" />
      <div className="PostReact">
        <img src={liked ? Heart : NotLike} alt="" onClick={handleLike} />
        <img src={Comment} alt="" onClick={() => {
          
          setCommentLoad(true);
          setCommentLoads(!commentLoads)
          
        }} />
        <img src={Share} alt="" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likes} Likes</span>
      <div className="detail">
        <span><b>{data.userName ? data.userName : userData.userName}</b></span>
        <span> {data.desc}</span>
      </div>
      <div>
           {commentLoads && (
          showComments.map((value) => {
            return (<div><span><img style={{ "width": "50px" }} src={value.userId.profilePicture} alt="" /> </span> <b>{value.userId.userName }</b> <span>{ value.comment}</span> </div>)
           
         }))
      
        }
      { commentLoads&&<Comments postId={data._id} setCommentLoad={setCommentLoad} />}
      </div>
   
    </div>

  )
}

export default Post 