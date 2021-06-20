import {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Login.scss'


const Studentlogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usertype, setUsertype] = useState('')
   

    const handleLogin = (props) => {
   
      axios.post('/auth/login', {username, password,usertype})
      .then((res) => {
        console.log('USER DATA', res.data)
      
          props.history.push('/dashboard')
      
      })
      .catch(err => console.log(err))
    }

  return(

    <div className= "loginform" >
      <h2>Login</h2>
      <p>email*</p>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <p>password*</p>
      <input className = 'password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <p>user type*</p>
      <select className = 'dropdown'>
        <option selected value={usertype}>user type</option>
        <option onClick ={setUsertype} value={usertype}>tutor</option>
        <option  onClick ={setUsertype} value={usertype}>student</option>
      </select>
      <br></br>
      <br></br>
      <div>
      <button onClick ={handleLogin}>Login</button>
      <p>Don't have an account?</p>
      <Link className='registerlink'>Register</Link>
      </div>
    </div>
   
     
     
  )
}

export default Studentlogin
