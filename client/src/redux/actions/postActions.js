
import {getPosts} from "../../api/postApi"

export const getTimeline = (userId) => {
    return async (dispatch) => {
        try {
        dispatch({ type: "POST_FETCHING" });
            const {data} = await getPosts(userId);
            console.log("post fetched",data)
        dispatch({ type: "POST_FETCHED",data });
          
        } catch (error) {
            console.log("error is working")
            console.log(error);
            dispatch({ type: "FETCHING_FAIL" });
        }
       
    }
}