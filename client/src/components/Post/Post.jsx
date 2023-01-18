import React, { useState } from 'react'
import './Post.css'
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png";
import Comments from '../Comments/Comments'
import coverPicture from "../../img/defaultProfile.png"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux'
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { savePost, reportPost, editPost } from '../../api/usersApi'
import { deletePosts } from '../../redux/actions/userAction'
import { likePost } from '../../api/postApi'

import Report from '@mui/icons-material/Report'
import { allComment } from '../../api/postApi'
import { Modal } from '@mantine/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Post = ({ data, id }) => {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.authReducer.authData);
  const [showComments, setShowComments] = useState([]);
  const [liked, setLiked] = useState(data.likes.includes(userData._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [report, setReport] = useState(false);
  const [commentLoad, setCommentLoad] = useState(false);
  const [commentLoads, setCommentLoads] = useState(false);
  const [reportText, setReportText] = useState("");
  const [opened, setOpened] = React.useState(false);
  const [deletes, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  const deletePost = async () => {
    dispatch(deletePosts(id))
  }
  const savePosts = async () => {

    await savePost(id, userData._id);
  }

  const reportSubmit = async () => {

    const data = { userId: userData._id, reportText: reportText }
    await reportPost(id, data)
    setReportText("")
    setOpened(false)
  }
  const editSubmit = async () => {
    //here in order to reduce the no of state i have actually used the  same state reportText 
    const data = { postId: id, desc: reportText }
    const datas = await editPost(id, data)
    dispatch({ type: "EDIT_POST", datas })
    setReportText("")
    setEdit(false)
  }
  const allComments = async () => {


    const { data } = await allComment(id);

    setCommentLoad(false);
    setShowComments(data.comments)

  }

  commentLoad && allComments()

  const handleLike = () => {

    likePost(data._id, userData._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };

  return (
    <div className="Post">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}>
        <div style={{ "textAlign": "center" }}>
          <span>Explain why your reporting this post?</span>



          <input style={{ "width": "100%", "marginTop": "10px" }} onChange={(e) => {
            setReportText(e.target.value)
          }} type="text" id="report" name='report' />
          <button style={{ "marginTop": "10px" }} onClick={reportSubmit}>submit</button>


        </div>

      </Modal>
      <Modal
        opened={edit}
        onClose={() => setEdit(false)}>
        <div style={{ "textAlign": "center" }}>
          <span>Edit the Description of your post?</span>



          <input style={{ "width": "100%", "marginTop": "10px" }} onChange={(e) => {
            setReportText(e.target.value)
          }} type="text" id="report" name='report' />
          <button style={{ "marginTop": "10px" }} onClick={editSubmit}>submit</button>


        </div>

      </Modal>

      <Modal
        opened={deletes}
        onClose={() => setDelete(false)}>
        <div style={{ "textAlign": "center" }}>

          <span> are you sure you want to delete the post?</span><br /><br />
          <button style={{}} onClick={deletePost}>delete</button>

        </div>

      </Modal>

      <div className="detail" style={{ "display": "flex", "justifyContent": "space-between", "paddingBottom": "3px" }}>
        <div>
          <span><img style={{ "width": "20px", }} src={data?.userId?.profilePicture ? data?.userId?.profilePicture : coverPicture} alt="" />  </span>
          <span>{data?.userId?.firstName} {data?.userId?.lastName}</span>
        </div>
        <div>
          <span className='icon' style={{}} onClick={() => {
            setReport(!report)
          }}><MoreVertIcon /> </span>
        </div>





      </div>
      {report ? <div className='Report' >
        {userData._id === data?.userId?._id ? <div >

          <div onClick={() => {
            setDelete(true)
          }}><DeleteForeverIcon /> Delete this post!</div>
          <div onClick={() => {
            setEdit(true)
          }}><EditIcon /> Edit Post</div>
        </div> : <div >
          {/* <div onClick={savePosts}><SaveAltIcon /> Save later</div> */}

          <div onClick={savePosts}><SaveAltIcon /> Save later</div>
          <div onClick={() => {

            setOpened(true)
          }}><Report /> Report this post!</div>


        </div>}

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
        <span><b>{data?.userId?.userName}</b></span>
        <span> {data.desc}</span>
      </div>
      <div>
        {commentLoads && (
          showComments.map((value) => {
            return (<div><span><img style={{ "width": "20px" }} src={value?.userId?.profilePicture?value?.userId?.profilePicture:coverPicture} alt="" /> </span> <b>{value.userId.userName}</b> <span>{value.comment}</span> </div>)

          }))

        }
        {commentLoads && <Comments postId={data._id} setCommentLoad={setCommentLoad} />}
      </div>

    </div>

  )
}

export default Post 