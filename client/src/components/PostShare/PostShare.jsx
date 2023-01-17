import React,{useState,useRef} from 'react'
import './PostShare.css'
import ProfileImage from '../../img/profileImg.jpg'
import * as CLOUDNER from '../../api/cloudenaryApi'
import { UilScenery } from '@iconscout/react-unicons'
import { UilPlayCircle } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilSchedule } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { useSelector, useDispatch } from 'react-redux'
import { postUpload ,textUpload} from '../../redux/actions/uploadActions'
import axios from 'axios'

const PostShare = () => {
    const [image, setImage] = useState(null);  
    const imageRef = useRef();
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.authReducer.authData);
 
    const desc = useRef();
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
      }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    

        const newPost = {
          userId: userData._id,
          desc: desc.current.value,
        };
    
        if (image) {
          const datas = new FormData();
          const filename = Date.now() + image.name;
          
          datas.append("name", filename);
          datas.append("file", image);
          datas.append("upload_preset", "ogamtbe3");
          datas.append("cloud_name","dxxgj5lfp")
       
          dispatch(postUpload(datas,newPost))
          setImage(null);
            
          desc.current.value = "";
        } 
        else {
          dispatch(textUpload(newPost))
        
          
          desc.current.value = "";
        }
      };


    

  return (
      <div className="PostShare">
          <img src={ProfileImage} alt=""/>
          <div>
            <input ref={desc} type='text' placeholder="What's happening "required/>  
         <div className="PostOptions">
                  <div className="option"
                      style={{ color: "var(--photo)" }}
                      onClick={() => imageRef.current.click()}>
                  <UilScenery />
                  Photo
              </div>
                  <div className="option"
                  style={{color:"var(--video)"}}>
                  <UilPlayCircle />
                  Video
              </div>
                  <div className="option"
                   style={{color:"var(--location)"}}>
                  <UilLocationPoint />
                  Location
              </div>
                  <div className="option"
                   style={{color:"var(--schedule)"}}>
                  <UilSchedule />
                  Schedule
                  </div>
                  <button className='button ps-button' onClick={handleSubmit}>
                      Share
                  </button>
                  <div style={{display:"none"}}>
                      <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                  </div>
              </div>
              {image &&
              
                  (<div className="previewImage">
                  <UilTimes onClick={() => {
                     setImage(null) 
                  }} />
                   <img src={URL.createObjectURL(image)} alt="" />
                </div>)
              }
          </div>
          
    </div>
  )
}

export default PostShare


