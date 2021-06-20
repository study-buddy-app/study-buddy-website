import {useState} from 'react'
// import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import {setUser} from '../../redux/authReducer'
// import {setBackpack} from '../../redux/backpackReducer'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import './Login.scss'




const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usertype, setUsertype] = useState('')

    // const student = () => setUsertype('student')
    // const tutor = () => setUsertype('Tutor')
 
    const dispatch = useDispatch()

    const handleLogin = () => {
  
      axios.post('/auth/login', {username, password, usertype})
      .then((res) => {
        console.log(res.data, 'logged in')
        dispatch(setUser(res.data))
        props.history.push('/dashboard')
        console.log('this is data', res.data)
        // axios.get('/api/backpack')
        // .then((response) => {
        //   dispatch(setBackpack(response.data)) 
      //   })        
      })
      .catch(err => console.log(err))
    }
     
    // const handleOnChange = (e) => {
    //   console.log('e', e)
    //   if(e.target.value = "student"){   
    //     setUsertype = "student"
    //     console.log(e.target.value)
    //   } else {
    //     setUsertype = "tutor"
    //   }
    // }
  
  return(

    <div className= "loginform" >
      <h2 className='login' >Login</h2>
      <p>user name*</p>
      <input placeholder='email'value={username} onChange={(e) => setUsername(e.target.value)} />
      <p>password*</p>
      <input placeholder='password'className = 'password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <p>user type*</p>
      <select className = 'dropdown'>
        <option  onClick={(e) => setUsertype(e.target.value)} value= 'usertype'>user type</option>
        <option selected value='tutor'>tutor</option>
        <option value= 'student' >student</option>
      </select>
      <br></br>
      <br></br>
      <div>
      <button onClick ={handleLogin}>Login</button>
      <p>Don't have an account?</p>
      <Link className='registerlink' to='/registration'>Register</Link>
      </div>

    </div>     
  )
}

export default Login
