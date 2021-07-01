import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { storage } from '../dashboard/firebase'

export default function Tutorprofile(props) {
    const {user} = useSelector((store) => store.authReducer)
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)

    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
    
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round (
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)

            },
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                  setUrl(url)
                })
    
            }
        )
        }

    return (
        <div className='tutorprofile'>
            <h1>Profile</h1>
            <div className='tutorpicture'>
             <br/><br/>

                <img className="tutor_img" src ={url || "http://via.placeholder.com/120x120"} alt ="firebase-image" />
                 <br/><br/>
                <input type="file" onChange={handleChange}/>
                <button onClick={handleUpload}>Change profile</button>
             </div>
            
             <h3 className='tutorpro'>Name <br/><br/>
             {`${user?.f_name} ${user?.l_name} `}</h3>
             <h3 className='tutorpro'>Email<br/><br/>
              {`${user?.email}`}</h3>
             <h3 className='tutorpro'>Usertype<br/><br/>
             {`${user?.usertype }`}</h3>
        </div>
    )
}
