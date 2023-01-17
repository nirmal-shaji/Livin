import React,{useState} from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authActions'
import { useSelector } from 'react-redux'
const InfoCard = () => {

    const { userData } = useSelector((state) => state.authReducer.authData);
    const [modalOpened, setModalOpened] = useState(false)
    const dispatch=useDispatch()
    const handleSubmit = () => {
   
    }
    const handleLogOut = ()=> {
        dispatch(logout())
      }
    

    return (
        <div className="InfoCard">
            <div className="InfoHead">
                <h4>Your Info</h4>
                <div>
                    <UilPen width='2rem' height='1.2rem' onClick={() => {
                        setModalOpened(true);
                    }} />
                    <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data= {userData}/>
                </div>
               
            </div>
                <div className="Info">
                    <span>
                        <b>
                            Status </b>
                    </span>
                    <span>
                        Single
                    </span>
                </div>
                <div className="Info">
                    <span>
                        <b>
                            Place </b>
                    </span>
                    <span>
                        Calicut
                    </span>
                </div>
                <div className="Info">
                    <span>
                        <b>
                            Works at </b>
                    </span>
                    <span>
                        Brototype 
                    </span>
                </div>

                <button className='button logout-button' onClick={handleLogOut}>Logout</button>
            

        </div>
    )
}

export default InfoCard