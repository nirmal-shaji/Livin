

const authReducer = (state = { authData: null, loading: false, error: false, updateLoading: false ,users:null}, action) => {
  switch (action.type) {
    case "AUTH_START":
      return {...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({...action.data}));
      return {...state,  authData: action.data, loading: false, error: false };



      case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
      case "PROFILE_UPLOADING":
      return { ...state, loading: true }
    case "SUCCESS":
     
      return { ...state, loading: false, authData: {...state.authData.token,userData:action.userData.data}}
      case "FAILURE":
      return { ...state, loading: false, error: true }
    
    case "FULL_USERS":
      return {...state,users:action.data.usersList}
    
    //following part
    case "FOLLOW_USER":
     
      return {...state, authData: {...state.authData, userData: {...state.authData.userData, following: [...action.data.following]} }}
    
    case "UNFOLLOW_USER":
  
      return {...state, authData: {...state.authData, userData: {...state.authData.userData, following: [...action.data.following]} }}
      
    case "LOG_OUT":
      localStorage.clear();
      return {...state,  authData:null, loading: false, error: false, updateLoading: false }

        default:
            return state;
    }
}

export default authReducer

 