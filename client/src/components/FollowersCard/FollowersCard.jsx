import React, { useState, useEffect } from 'react';
import './FollowersCard.css';

import { useSelector,useDispatch } from 'react-redux';
import { followers } from '../../Data/FollowersData';
import { getAllUsers } from '../../api/usersApi';
import User from '../User/User';
import { useParams } from 'react-router-dom';
const FollowersCard = ({ location }) => {
  const params = useParams()

  const dispatch=useDispatch()
 const [useEffectLoad, setUseEffectLoad] = useState(false);
  const [persons, setPersons] = useState([]);
    useEffect(() => {
      const fetchPersons = async () => {
        
        const { data } = await getAllUsers();
        dispatch({ type: "FULL_USERS", data });
     
      setPersons(data.usersList);
    };
    fetchPersons();
    }, []);


 
  const { followers, _id } = useSelector((state) => state.authReducer.authData.userData)
  if (params._id) {
    
   }

  const {users}=useSelector((state)=>state.authReducer)

  const followersData = followers?.map((value) => {
   

   
     return(users?.find((id) => id._id === value))
  
  
  })

  return (
    <div className='FollowersCard'>
      <h3>{location === 'homepage' ? "People you may know" : "Who is following you"}</h3>

      {location === 'homepage' ?
        (users?.map((value, id) => {
        
          if(value._id!==_id)
          return (
            <User person={value} key={value._id} />
          )
        })
        ) : (
          followersData?.map((value) => {
  
            return (
            <User person={value} key={value._id} />
          )
      
            
        
          }))}
    </div>
  )
}

export default FollowersCard