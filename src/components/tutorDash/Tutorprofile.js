import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { app } from '../dashboard/firebase'
import {setUser} from '../../redux/authReducer'

const db = app.firestore()

export default function Tutorprofile() {
    const [newinfo, setNewInfo] = useState()
    const [imgUrl, setImgUrl] = useState(null)
    const [users, setUsers] = useState([])
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
        
 
        <div className ='tutorprofile'>

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
