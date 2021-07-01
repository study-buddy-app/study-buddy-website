import React from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

export default function Tutorprofile() {
    const {user} = useSelector((store) => store.authReducer)
    const handleClick =() =>{
        // axios
        // .put(`/api/tutor/profile/${user.tutor_id}`,{f_name, l_name, username})
        // res.data
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
                <td><input type="text" placeholder={user.f_name} /></td>
                </tr>
                <tr>
                <th>Last Name</th>
                <td><input type="text" placeholder={user.l_name} /></td>
                </tr>
                <tr>
                <th>Username</th>
                <td><input type="text" placeholder={user.username} /></td>
                </tr>
                <tr>
                <th> Email</th>
                <td><input type="text" placeholder={user.email} /></td>
                </tr>
                <tr>
                    <button className='btn_update_tprofile'>Update</button>
                </tr>
            </table>
        </div>
        </div>
    )
}
