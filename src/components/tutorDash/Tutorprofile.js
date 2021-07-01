import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

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
        <div>
        {/* <div className='tutorprofile'>
            <h1>Profile</h1>
             <div className='picture'></div>
             <h3 className='pro'>Name  <br/><br/>
             {`${user?.f_name} ${user?.l_name} `}</h3>
             <h3 className='pro'>Email<br/><br/>
              {`${user?.email}`}</h3>
             <h3 className='pro'>Subjects<br/><br/>
             {`${user?.backpack}`}</h3>
        </div> */}
        <div className ='tutorprofile'>
            <table>
                <tr>
                <th>First Name</th>
                <td><input onChange ={(e)=>fNameOnChange(e)}type="text" placeholder={user.f_name} /></td>
                </tr>
                <tr>
                <th>Last Name</th>
                <td><input onChange ={(e)=>lNameOnChange(e)}type="text" placeholder={user.l_name} /></td>
                </tr>
                <tr>
                <th>Username</th>
                <td><input onChange ={(e)=>userNameOnChange(e)}type="text" placeholder={user.username} /></td>
                </tr>
                <tr>
                <th> Email</th>
                <td><input onChange ={(e)=>emailOnChange(e)} type="text" placeholder={user.email} /></td>
                </tr>
                <tr>
                    <button onClick ={handleClick}className='btn_update_tprofile'>Update</button>
                </tr>
            </table>
        </div>
        </div>
    )
}
