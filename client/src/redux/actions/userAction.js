import { followUserApi,unfollowUserApi } from "../../api/usersApi" 


export const followUser =  (userData,id) => {
    return (
        async (dispatch) => {
           
            const {data}   = await followUserApi(userData, id);
           console.log(data)
            dispatch({type:"FOLLOW_USER",data})
        }
        
    )
   
}
export const unfollowUser = (userData,id) => {
    return (
        async (dispatch) => {
             console.log("this is working unfolooow")
            const {data }= await unfollowUserApi(userData,id);
            dispatch({type:"UNFOLLOW_USER",data})
        }
    )
}

