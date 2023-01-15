import React, { useState, useEffect } from 'react';
import './FollowersCard.css';

import { useSelector,useDispatch } from 'react-redux';
import { followers } from '../../Data/FollowersData';
import { getAllUsers } from '../../api/usersApi';
import User from '../User/User';
import { useParams } from 'react-router-dom';
const FollowersCard = ({ location }) => {
  const params = useParams()
  console.log(params,"this is the parameter")
  const dispatch=useDispatch()
 const [useEffectLoad, setUseEffectLoad] = useState(false);
  const [persons, setPersons] = useState([]);
    useEffect(() => {
      const fetchPersons = async () => {
        
        const { data } = await getAllUsers();
        dispatch({ type: "FULL_USERS", data });
      console.log(data,"this is the data from backend")
      setPersons(data.usersList);
    };
    fetchPersons();
    }, []);
  console.log(location)

  // if (!location) {
  //   console.log("is this working")
  //   setUseEffectLoad(!useEffectLoad);
  // }
    

  //  if (!persons) {
  //   console.log("this is not workinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg")
  //   setUseEffectLoad(true)
  // }
  // console.log(useEffectLoad)
 
  const { followers, _id } = useSelector((state) => state.authReducer.authData.userData)
  if (params._id) {
    
   }

  const {users}=useSelector((state)=>state.authReducer)
  console.log(users,"this is userssssssssssssss arrayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
  const followersData = followers?.map((value) => {
    console.log(value)
    // useEffectLoad?console.log(persons,"this is the state"):console.log("set state don't work")
   
     return(users?.find((id) => id._id === value))
  
  
  })
  console.log(followersData,"this is the followers data aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  return (
    <div className='FollowersCard'>
      <h3>{location === 'homepage' ? "People you may know" : "Who is following you"}</h3>

      {location === 'homepage' ?
        (users?.map((value, id) => {
          console.log(value, "this is data")
          if(value._id!==_id)
          return (
            <User person={value} key={value._id} />
          )
        })
        ) : (
          followersData?.map((value) => {
         console.log(value,"this is the vLUWWWWWW")
            return (
            <User person={value} key={value._id} />
          )
      
            
        
          }))}
    </div>
  )
}

export default FollowersCard