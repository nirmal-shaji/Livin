import * as AuthApi from '../../api/authApi';

export const Login = (formData) => {
    return async (dispatch) => {
        try {
       dispatch({type: "AUTH_START"});
            const { data } = await AuthApi.Login(formData)
            dispatch({ type: "AUTH_SUCCESS", data });
       } catch (error) {
            console.log(error)
            dispatch({ type: "AUTH_FAIL" });
       }
     
    }
}

export const SignUp = (formData) => {
    
    return async (dispatch) => {
        dispatch({type: "AUTH_START"});
        try {
            
            const { data } = await AuthApi.SignUp(formData) 
       
            dispatch({ type: "AUTH_SUCCESS", data });
        } catch (error) {
            console.log(error);
            dispatch({ type: "AUTH_FAIL" });
        }
      
    }
}
export const adminLogin = (formData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "ADMIN_AUTH_START" });
            const { data } = await AuthApi.adminLogin(formData)
            dispatch({ type: "ADMIN_AUTH_SUCCESS", data });
        } catch (error) {
            console.log(error)
            dispatch({ type: "ADMIN_AUTH_FAIL" });
        }
     
    }
}
export const logout = ()=> async(dispatch)=> {
  dispatch({type: "LOG_OUT"})
}
export const adminLogout = ()=> async(dispatch)=> {
  dispatch({type: "ADMIN_LOG_OUT"})
}
