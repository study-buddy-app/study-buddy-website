import React, {useState} from 'react'
import './Dashboard.scss'
import {setUser} from '../../redux/authReducer'
import {useSelector} from 'react-redux'
import  { storage } from 'firebase'
import Backpack from './Backpack'

export default function Profile(props) {
    const [image, setImage] = useState(null)
    const {user} = useSelector((store) => store.authReducer)

    const handleChange = e => {
        if (e.target.files[0]){

        }
    }
    const handleUpload = () => {

    }

    return (
        <div className='profile'>
             <h1>Profile</h1>
             <div className='picture'>
                 <input type="file" onChange={handleChange}/>
                 <button onClick={handleUpload}>Upload</button>
             </div>
             <h3 className='pro'>Name  <br/><br/>
             {`${user?.f_name} ${user?.l_name} `}</h3>
             <h3 className='pro'>Email <br/><br/>
              {`${user?.email}`}</h3>
             <h3 className='pro'>Age <br/><br/>
             {`${user?.age}`}</h3>
            
    
        </div>
    )
}
