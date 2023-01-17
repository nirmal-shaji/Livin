import { followUserApi,unfollowUserApi,deletePost } from "../../api/usersApi" 


export const followUser =  (userData,id) => {
    return (
        async (dispatch) => {
           
            const {data}   = await followUserApi(userData, id);
          
            dispatch({type:"FOLLOW_USER",data})
        }
        
    )
   
}
export const unfollowUser = (userData,id) => {
    return (
        async (dispatch) => {
           
            const {data }= await unfollowUserApi(userData,id);
            dispatch({type:"UNFOLLOW_USER",data})
        }
    )
}

export const deletePosts = (id) => {
    console.log("inside")
    return (
        async (dispatch) => {
        console.log("this is working")
        const data = await deletePost(id);
        dispatch({type:"POST_DELETE",data})
    })
}
