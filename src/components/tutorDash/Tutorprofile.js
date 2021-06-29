import React from 'react'
import {useSelector} from 'react-redux'

export default function Tutorprofile() {
    const {user} = useSelector((store) => store.authReducer)
    return (
        <div className='tutorprofile'>
            <h1>Profile</h1>
             <div className='picture'></div>
             <h3 className='pro'>Name  <br/><br/>
             {`${user?.f_name} ${user?.l_name} `}</h3>
             <h3 className='pro'>Email<br/><br/>
              {`${user?.email}`}</h3>
             <h3 className='pro'>Subjects<br/><br/>
             {`${user?.backpack}`}</h3>
        </div>
    )
}
