import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { app } from '../dashboard/firebase'
import './Tutordash.scss'


const db = app.firestore() 

export default function Tutorprofile() {
    const [newinfo, setNewInfo] = useState()
    const [f_name, setFName] = useState('')
    const [l_name, setLName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
   
 

    const {user} = useSelector((store) => store.authReducer)

    const handleClick =() =>{
        const tutor_id = +user.tutor_id
        axios
        .put(`/api/tutor/profile/`+parseInt(user.tutor_id),{f_name, l_name, username,email, tutor_id})
        .then((res) => {
            setNewInfo(res.data)
    })}
    console.log('new info', newinfo)
    const fNameOnChange =(e)=>{
       setFName(e.target.value)
    }
    const lNameOnChange =(e)=>{
       setLName(e.target.value)
    }
    const userNameOnChange =(e)=>{
       setUserName(e.target.value)
    }
    const emailOnChange =(e)=>{
       setEmail(e.target.value)
    }
        
    return (
        
 
        <div className ='tutorprofile'>
        <h1>Profile</h1>  
        <div className='tutor-profile-table'>

            <h3 className='tutor-pro'>Name<br/><br/>
            <input  onChange ={(e)=>fNameOnChange(e)}type="text" placeholder={user.f_name} /><br/><br/>
            <input onChange ={(e)=>lNameOnChange(e)}type="text" placeholder={user.l_name} />
            </h3>
            <br/><br/>
            <h3 className='tutor-pro'>Username<br/><br/>
            <input onChange ={(e)=>userNameOnChange(e)}type="text" placeholder={user.username} />
            </h3>
            <br/><br/>
            <h3 className='tutor-pro'>Email<br/><br/>
            <input onChange ={(e)=>emailOnChange(e)} type="text" placeholder={user.email} />
            </h3>
            <button onClick ={handleClick}className='btn_update_tprofile'>Update</button>
        </div>
           
       

        </div>
    )
}
