import {useState} from 'react'
import { Link}  from 'react-router-dom';


const Studentauth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return(

    <div className= "auth">
      <div className = "authheader">
        <div >
        <Link className='loginlink' to = '/Studentauth'>LOGIN</Link>
        </div>
    
      </div>
    
      <p>email*</p>
      <input className = 'email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <p>password*</p>
      <input className = 'password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className = 'authbuttons'>
      <button className = 'login'>Login</button>
      <p className='forgotpw'>Forgot your password?</p>
      
      </div>
    </div>
   
     
     
  )
}

export default Studentauth
