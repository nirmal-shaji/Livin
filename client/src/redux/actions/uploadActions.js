import * as API from "../../api/uploadPostApi"
import * as UPLOAD_API from '../../api/cloudenaryApi'
import * as USER_API from "../../api/usersApi"


export const postUpload = (newdata,newPost) => {
    console.log(newdata,"first line")
    console.log(newPost)
    return async (dispatch) => {
        try {
        dispatch({ type: "POST_UPLOADING" })
            const photoData = await UPLOAD_API.imageUpload(newdata);
           
        //    console.log(photoData,"data of photo is here")
           newPost.imageUrl = photoData.data.secure_url;
        //   console.log(newPost,"sfsfsdfsfdsdf")
          const {data} = await API.uploadPost(newPost);
           
        dispatch({ type: "POST_UPLOADED" ,data}); 
        } catch (error) {
            console.log(error)
            dispatch({ type: "POST_UPLOAD_FAIL" })
        }
      
    }
}

export const textUpload = (newPost) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "POST_UPLOADING" });
        await API.uploadPost(newPost)
        dispatch({ type: "POST_UPLOADED" });  
        } catch (error) {
            console.log(error);
            dispatch({ type: "POST_UPLOAD_FAIL" });
        }
       
    } 
}

export const coverPhotoUpload = (imageUpload,data) => {
    return async (dispatch) => {
        try {
            dispatch({type:"PROFILE_UPLOADING"})
            const uploadData = await UPLOAD_API.imageUpload(imageUpload);
            
            data.coverPicture = uploadData.data.secure_url
          
            const userData = await USER_API.updateUser(data, data._id)
            console.log(userData,"this is the userData usedddddd")  
            dispatch({type:"SUCCESS",userData})
            
            
        } catch (error) {
            dispatch({type:"FAILURE"})
            console.log(error);
            
        }
    }   
}
export const profilePhotoUpload = (imageUpload,data) => {
    return async (dispatch) => {
        try {
            dispatch({type:"PROFILE_UPLOADING"})
            const uploadData = await UPLOAD_API.imageUpload(imageUpload);
            
            data.profilePicture = uploadData.data.secure_url
            console.log(data, "the users data is herere");
           
            const  userData  = await USER_API.updateUser(data, data._id)
            console.log(userData,"this is the userData usedddddd")
            dispatch({type:"SUCCESS",userData})
            
            
        } catch (error) {
            dispatch({type:"FAILURE"})
            console.log(error);
            
        }
    }   
}
export const updateDetails = (userDatas,data) => {
    return async (dispatch) => {
        try {
            dispatch({type:"PROFILE_UPLOADING"})
            const userData = await USER_API.updateUser(data, userDatas._id)
            console.log(userData,"this is the userData usedddddd")
            dispatch({type:"SUCCESS",userData})
        } catch (error) {
            dispatch({type:"FAILURE"})
            console.log(error)
        }
    }
}