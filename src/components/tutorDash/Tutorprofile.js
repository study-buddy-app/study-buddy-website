import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { app } from '../dashboard/firebase'
import {setUser} from '../../redux/authReducer'


const db = app.firestore()

export default function Tutorprofile(props) {
    const dispatch =  useDispatch()
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
            age: age || user?.age,
        }

        axios.put('/api/tutor/profile', body)
        .then((res) => {
            console.log(res.data)
            dispatch(setUser(res.data))
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
            <div className='tutorpicture'>

              
                <ul>
                    {users.map(user => {
                        return (
                            <li className="li-tag" key={user.name}>
                            <img width="100" height="100" src={user.img} alt={user.name}/>
                            <p>{user.name}</p>
                            </li>
                        )
                    })}  
                </ul>
                <form onSubmit= {onSubmit}>
                    <input type ="file" onChange ={handleChange} />
                    <input type ="text" name= "username" placeholder="NAME"/>
                    <button>unpload</button>
                </form>
             </div>
             <div className="editprofile">
             <h3 className='tutorpro'>Name</h3>
             {showEdit ? (
                 <>
                    <input placeHolder="first name"  value={f_name} onChange={(e) => setF_name(e.target.value)}></input>
                    <input placeHolder="last name" value={l_name} onChange={(e) => setL_name(e.target.value)}></input>
                </>
             ):(
                    <h4>{`${user?.f_name} ${user?.l_name}`}</h4>
             )}

              <h3 className='tutorpro'>username</h3>
             {showEdit ? (
                 <>
                    <input value={username} onChange={(e) => setUsername(e.target.value)}></input> 
                </>
             ):(
                <h4>{`${user?.username}`}</h4>
             )}
             <h3 className='tutorpro'>email</h3>
             {showEdit ? (
                 <>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </>
             ):(
             <h4>{`${user?.email}`}</h4>
             )}
            
             <h3 className='tutorpro'>age</h3>
             {showEdit ? (
                 <>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)}></input>
                </>
             ):(
             <h4>{`${user?.age}`}</h4>
             )}
             <div className="profilebutton">
            <button  onClick={handleUpdateProfile}>update profile</button>
            <button onClick={()=> setShowEdit(!showEdit)}>edit</button>
            </div>
             <h3 className='tutorpro'>Usertype<br/><br/>
             {`${user?.usertype }`}</h3>
             </div>
        </div>
    )
}
