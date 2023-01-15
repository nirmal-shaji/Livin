import React from 'react'

import Logo from "../../../img/logo.png"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin } from '../../../redux/actions/authActions'


 



const AdminLogin = () => {
   
    const [userData, setUserData] = useState({ userName: "", password: ""});

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.adminAuthReducer.loading);
    const userDataChange=(event)=> {
        setUserData((prevState) => {
           return({...prevState,[event.target.name]:event.target.value})
       })
    }
    const submitData = (event) => {
        
        event.preventDefault();
    

         dispatch(adminLogin(userData));
        
           
       
     
            
        
            
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
                           Admin Login
                        </h3>
        

                        <div>
                            <input type="text" placeholder='User Name' className='InfoInput' name='userName' onChange={userDataChange} value={userData.userName} />

                        </div>
                        <div>
                            <input type="password" placeholder='Password' className="InfoInput" name='password' onChange={userDataChange} value={userData.password} />


                        </div>
                     
                   
                        <button className='button InfoButton' type='submit' disabled={loading}>{loading?"Loading..." : "Login"}</button>
                    </form>
                </div>

            </div>
        </div>
    )
}



export default AdminLogin