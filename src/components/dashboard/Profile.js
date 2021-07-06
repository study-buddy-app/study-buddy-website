import React, {useState} from 'react'
import './Dashboard.scss'
import {setUser} from '../../redux/authReducer'
import {useSelector} from 'react-redux'
// import 'antd/dist/antd.css'
// import {Avatar} from 'antd'
import { storage } from './firebase'

export default function Profile(props) {
    const {user} = useSelector((store) => store.authReducer)
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)

    // const handleChange = e => {
    //     if (e.target.files[0]){
    //         setImage(e.target.files[0]);
    
    //     }
    // }
    // const handleUpload = () => {
    //     const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //     uploadTask.on(
    //         "state_changed",
    //         snapshot => {
    //             const progress = Math.round (
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //             )
    //             setProgress(progress)

    //         },
    //         error => {
    //             console.log(error);
    //         },
    //         () => {
    //             storage
    //             .ref("images")
    //             .child(image.name)
    //             .getDownloadURL()
    //             .then(url => {
    //               setUrl(url)
    //             })
    
    //         }
    //     )
    //     }

    return (
        <div className='profile'>
             <h1>Profile</h1>
             <h3 className='pro'>Name <br/><br/>
             {`${user?.f_name} ${user?.l_name} `}</h3>
             <h3 className='pro'>Email <br/><br/>
              {`${user?.email}`}</h3>
              <h3 className='pro'>usertype<br/><br/>
             {`${user?.usertype }`}</h3>
            
    
        </div>
    )
}
