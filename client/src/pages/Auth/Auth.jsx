import React from 'react'
import './Auth.css'
import Logo from "../../img/logo.png"
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { SignUp, Login ,adminLogin} from '../../redux/actions/authActions'
import { useLocation } from 'react-router-dom'
 



const Auth = () => {
    const location = useLocation();
    const [isSignUp, setSignUp] = useState();
    const [userData, setUserData] = useState({ firstName: "", lastName: "", userName: "", password: "", confirmPassword: "" });
    const [isConfirmPassword, setIsConfirmPassword] = useState(true);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
    const userDataChange=(event)=> {
        setUserData((prevState) => {
           return({...prevState,[event.target.name]:event.target.value})
       })
    }
    const submitData = (event) => {
        
        event.preventDefault();
       
        if (location.pathname === "/admin" ) {
        
            dispatch(adminLogin(userData));
        }
           
        else {
            if (isSignUp) {
        
                userData.confirmPassword === userData.password ? dispatch(SignUp(userData)) : setIsConfirmPassword(false) 
            }
               
            else {
                dispatch(Login(userData))
            }
        }
     
            
        
            
    }
    const resetForm = () => {
        setSignUp(!isSignUp);
        setIsConfirmPassword(true)
        setUserData({ firstName: "", lastName: "", userName: "", password: "", confirmPassword: "" })
    }
    return (
        <div className="Auth">
            {/* left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="WebName">
                    <h1>Liva</h1>
                    <h6>Live the life at its peak</h6>
                </div>
                {/* right side  */}
                <div className="a-right">
                    <form className="InfoForm AuthForm" onSubmit={submitData}>
                        <h3>
                            {isSignUp ? 'Sign up ' : 'Login'}
                        </h3>
                        {isSignUp && <div>
                            <input type="text" placeholder='First Name' className='InfoInput' name='firstName' onChange={userDataChange} value={userData.firstName} />
                            <input type="text" placeholder='Last Name' className='InfoInput' name='lastName' onChange={userDataChange} value={userData.lastName} />

                        </div>}

                        <div>
                            <input type="text" placeholder='User Name' className='InfoInput' name='userName' onChange={userDataChange} value={userData.userName} />

                        </div>
                        <div>
                            <input type="password" placeholder='Password' className="InfoInput" name='password' onChange={userDataChange} value={userData.password} />
                            {isSignUp && <input type="password" placeholder='Confirm Password' className='InfoInput' name='confirmPassword' onChange={userDataChange} value={userData.confirmPassword} />}

                        </div>
                        <span style={{display:isConfirmPassword?'none':'block' ,color:'red',fontSize:"12px"}}>
                           * Your password and confirm password is not same
                        </span>
                        <div>
                            <span style={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => {
                               resetForm()
                            }}>{isSignUp ? 'Already have an account? Login' : 'New user? Sign Up'}</span>
                        </div>
                        <button className='button InfoButton' type='submit' disabled={loading}>{loading?"Loading...":isSignUp ? "Submit" : "Login"}</button>
                    </form>
                </div>

            </div>
        </div>
    )
}



export default Auth