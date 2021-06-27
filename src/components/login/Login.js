import {useState} from 'react'
// import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import {setUser} from '../../redux/authReducer'
import {setBackpack} from '../../redux/backpackReducer'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import './Login.scss'




const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let [usertype, setUsertype] = useState('')
 
  const dispatch = useDispatch()

    const handleLogin = () => {

    axios.post('/auth/login', {username, password, usertype})
    .then((res) => {
      console.log(res.data, 'logged in')
      dispatch(setUser(res.data))
      console.log('this is data', res.data)
      axios.get('/api/backpack')
      .then((response) => {
        dispatch(setBackpack(response.data)) 
      })        
    })
    .catch(err => console.log(err))
  }
    
  let handleOnChange = (e) => {
    console.log('e', e)
    if(setUsertype(e.target.value) === 'student'){   
      setUsertype = "student"
      props.history.push('/dashboard')
      console.log(e.target.value)
    } else {
      setUsertype = "tutor"
      props.history.push('/tutordash')
      console.log(e.target.value)
    }
  }

  
  return(
    <div className='login'>   
    <div className= 'loginform'>
      <h2 className='login1' >Login</h2>
      <p className='p1'>user name*</p>
      <input  className='input1' placeholder='user name'value={username} onChange={(e) => setUsername(e.target.value)} />
      <p className='p2'>password*</p>
      <input className='input2' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}  type="password" />
      <p className='p3'>user type*</p>
      <select className = 'dropdown' onChange={handleOnChange}>
        <option   value='usertype' >user type</option>
        <option   value= 'tutor'>tutor</option>
        <option  value= 'student' >student</option>
      </select>
      <br></br>
      <br></br>
      <div className='bottomform'>
      <button className='login2'onClick ={handleLogin}>Login</button>
     <Link to="/registration"><p className='p4'>Don't have an account? Click here to create one!</p></Link>
      {/* <Link className='registerlink' to='/registration'>Register</Link> */}
      </div> 
    </div>
    <video className='videoTag' poster='poster.jpg' autoPlay loop muted>
      <source src='https://res.cloudinary.com/dgaapgd2f/video/upload/v1624342211/Untitled_design_1_aeolkz.mp4' type='video/mp4' />s
      </video>
    </div>
  
  )
}

export default Login
