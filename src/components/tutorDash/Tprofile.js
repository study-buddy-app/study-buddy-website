import './Tutordash.scss'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { app } from '../dashboard/firebase'

const db = app.firestore() 


export default function Tprofile(props) {
  
    const {user} = useSelector((store) => store.authReducer)
    const [imgUrl, setImgUrl] = useState(null)
    const [users, setUsers] = useState([])
    const [f_name, setF_name] = useState('')
    const [l_name, setL_name] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState(null)
    const [showEdit, setShowEdit] = useState(false)

       const handleUpdateProfile = () => {

        const body = {
            f_name: f_name || user?.f_name,
            l_name: l_name || user?.l_name,
            username: username|| user?.username,
            email: email || user?.email,

        }
      
        axios.put('/api/tutor/profile', body)
        .then((res) => {
            console.log(res.data)
        
            setShowEdit(false)
        })
        .catch(err => {
            console.log(err)
        })
       }
  

    const handleChange = async (e)=> {
        const file = e.target.files[0]
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setImgUrl(await fileRef.getDownloadURL())
    
        }
          const onSubmit = (e) => {
                e.preventDefault()
                const username = e.target.username.value
                if(!username){
                    return
                }
                db.collection("pictured").doc(username).set({
                    img:imgUrl,
                    name:username
                   
                    
                })   
            }
            useEffect(() => {
                const fetchUsers = async () => {
                    const usersCollection = await db.collection('pictured').get()
                    setUsers(usersCollection.docs.map(doc => {
                        return doc.data()
                    }))
                }
                fetchUsers()
            }, [])
    return (
        <div className='tutorprofile'>
            <h1>Profile</h1>
            <h4  className='tutor-pro'>Usertype-
             {`${user?.usertype }`}</h4>
            {/* <div className='tutorpicture'> */}
                {/* <ul>
                    {users.map(user => {
                        return (
                            <li className="li-tag" key={user.name}>
                            <img width="100" height="100" src={user.img} alt={user.name}/>
                            <p>{user.name}</p>
                            </li>
                        )
                    })}  
                </ul> */}
                {/* <form onSubmit= {onSubmit}>
                    <input type ="file" onChange ={handleChange} />
                    <input type ="text" name= "username" placeholder="NAME"/>
                    <button>unpload</button>
                </form> */}
             {/* </div> */}
             <div className="tutor-profile-table">
             <h3 className='tutorpro'>Name</h3>
             
             {showEdit ? (
                 <>
                    <input placeHolder="first name"  value={f_name} onChange={(e) => setF_name(e.target.value)}></input>
                    <input placeHolder="last name" value={l_name} onChange={(e) => setL_name(e.target.value)}></input>
                </>
             ):(
                    <h5>{`${user?.f_name} ${user?.l_name}`}</h5>
             )}
                <br/><br/>
              <h3 className='tutorpro'>username</h3>
             {showEdit ? (
                 <>
                    <input value={username} onChange={(e) => setUsername(e.target.value)}></input> 
                </>
             ):(
                <h5>{`${user?.username}`}</h5>
             )}
             <br/><br/>
             <h3 className='tutorpro'>email</h3>
             {showEdit ? (
                 <>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </>
             ):(
             <h5>{`${user?.email}`}</h5>
             )}
            
            <br/><br/>
             <div className="profilebutton">
            <button  onClick={handleUpdateProfile}>update profile</button>
            <button onClick={()=> setShowEdit(!showEdit)}>edit</button>
            </div>
                
             </div>
             </div>
             )
             }