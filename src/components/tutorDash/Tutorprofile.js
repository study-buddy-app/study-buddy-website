import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { app} from '../dashboard/firebase'

// const db = app.firestore()

export default function Tutorprofile(props) {
    const {user} = useSelector((store) => store.authReducer)
    const [files, setFiles] = useState([])
    const [fileurl, setFileUrl] = useState(null)
    const [progress, setProgress] = useState(0)


    const handleChange = async (e) => {
        const file = e.target.files[0]
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())
       
       
    }
    const handleUpload = (e) => {
       e.preventDefault()
       const username = e.target.username.value;
       if(!username){
           return 
       }
    //    db.collection("files").doc(username).set({
    //        name:username,
    //        avatar:fileurl
    //    })
            }

            // useEffect(() =>{
            //     const fetchUsers =async () => {
            //         const fileCollection = await db.collection('files').get()
            //         setFiles(fileCollection.docs.map(doc =>{
            //             return doc.data()
            //         }))
            //     }
            //     fetchUsers()
            // }, [])

    return (
        <div className='tutorprofile'>
            <h1>Profile</h1>
            <div className='picture'>
             <br/><br/>

        
             </div>
             <div className='picture'></div>
             <h3 className='pro'>Name  <br/><br/>
             {`${user?.f_name} ${user?.l_name} `}</h3>
             <h3 className='pro'>Email<br/><br/>
              {`${user?.email}`}</h3>
             <h3 className='pro'>usertype<br/><br/>
             {`${user?.usertype }`}</h3>
        </div>
    )
}
