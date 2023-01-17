const postReducer = (state = { postData: null,fetchedPost:null, loading: false, error: false ,uploading:false}, action) => {
    switch (action.type) {
        //data fetching
        case "POST_FETCHING":
            return {...state, loading: true, error: false };  
            
        case "POST_FETCHED":
            
            
            return {...state,  fetchedPost: [...action.data], loading: false, error: false };
            
        case "FETCHING_FAIL":   
            return { ...state, loading: false, error: true }; 
       //post upload    
        case "POST_UPLOADING":
            return {...state, uploading: true, error: false };  
            
        case "POST_UPLOADED":
            
            
            return {...state,  postData: [action.data], uploading:false, error: false };
            
        case "POST_UPLOAD_FAIL": 
            return { ...state, uploading: false, error: true };  
        case "POST_DELETE":
            return { ...state, postData: [action.data], uploading: false, error: false };
        case "EDIT_POST":
            return { ...state, postData: [action.data], uploading: false, error: false };
        default:
            return state;
       
    }
}
export default postReducer