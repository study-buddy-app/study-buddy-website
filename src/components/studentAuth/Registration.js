import {useState} from 'react'
import axios from 'axios'
import {setUser} from '../../redux/authReducer'
import {setBackpack} from '../../redux/backpackReducer'
import { useDispatch } from 'react-redux'
import '../studentAuth/Registration.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Registration = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [f_name, setF_name] = useState('')
    const [l_name, setL_name] = useState('')
    const [age, setAge] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')
    const [usertype, setUsertype] = useState('')
    const dispatch = useDispatch()
    const student = () => setUsertype('student')
    const [studentColor, setstudentColor] = useState('')
    const [whichForm, setWhichForm] = useState(null)
    const tutor = () => setUsertype('tutor')
    const [tutorColor, setTutorColor] = useState('')

    const handleRegister = (e) => {
        e.preventDefault()
        axios.post('/auth/register', {username, password, usertype, email, age, f_name, l_name, state, city})
        .then((res) =>{
            console.log(res.data)
            dispatch(setUser(res.data))
            axios.get('/api/backpack')
            .then((response) => {
                dispatch(setBackpack(response.data))
                props.history.push('/stripe')
                notify()//<-- adding toast
            })
        })
    }

    const colorStudent = () => {
        setstudentColor(!studentColor)
    }
    const colorTutor = () => {
        setTutorColor(!tutorColor)
    }
    let  btn_student = studentColor ? "blueButton" : "normButton";
    let  btn_tutor = tutorColor ? "blueButton" : "normButton";

    const handleStudent = () => {
        student()
        colorStudent()
    }

    const handleTutor = () => {
        tutor()
        colorTutor()
    }

    
    const tutorForm = () => {
        setWhichForm(false)
    }
    const studentForm = () => {
        setWhichForm(true)
    }

toast.configure()//<--toast funct
  const notify= ()=>{
    toast('Registration complete, please check your email for confirmation.')
  }

    if(whichForm === null)return(
        <div div className='pick-tutor-student'>
           <div className='toggle-form' onClick={studentForm}><h3>Create Student Account</h3></div>
            <div className='toggle-form' onClick={tutorForm}><h3>Create Tutor Account</h3></div>
        </div>
    )

    if(whichForm === true)return (
        <div className='register'>
                 <h1 className='create'>Create Student Account</h1>
            <div className='register-container'>
             <form className="register-form" onSubmit={handleRegister}>
                <input  value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"required/>
                <input  value={f_name} onChange={(e) => setF_name(e.target.value)} placeholder="Enter first name"required/>
                <input  value={l_name} onChange={(e) => setL_name(e.target.value)} placeholder="Enter last name"required/>
                <input  value={state} onChange={(e) => setState(e.target.value)}  placeholder="Enter State" maxlength="2" required/>
                <input  value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City"required/>
                <input  value={age} onChange={(e) => setAge(e.target.value)} placeholder="Submit age must be 18+" type="number"  required/>
                <input  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" type="email" required/>
                <input  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" type="password" required/>
                <div className='confirm-container'>
                <h3>Confirm you are a Student<div className={btn_student} onClick={handleStudent}>Yes</div></h3>
                 </div>
                 <button className="Sign-Up">Sign Up</button>
             </form>    
             <br></br>
             <div className='toggleBtn' onClick={tutorForm}><h3 className='sky-h3'>Want to create a Tutor account? Click Here</h3></div>
             </div>
        </div>
    )
    if(whichForm === false)return (
        <div className='register'>
                <h1 className='create'>Create Tutor Account</h1>
              <div className='register-container'>
             <form className="register-form" onSubmit={handleRegister}>
                <input  value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"required/>
                <input  value={f_name} onChange={(e) => setF_name(e.target.value)} placeholder="Enter first name"required/>
                <input  value={l_name} onChange={(e) => setL_name(e.target.value)} placeholder="Enter last name"required/>
                <input  value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter State" maxlength="2" required/>
                <input  value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City"required/>
                <input  value={age} onChange={(e) => setAge(e.target.value)} placeholder="Submit age must be 18+" type="number"  required/>
                <input  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" type="email" required/>
                <input  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" type="password" required/>
            <div className='confirm-container'>
            <h3>Confirm you are a Tutor<div className={btn_tutor} onClick={handleTutor}>Yes</div></h3>
            </div>
                 <button className="Sign-Up">Sign Up</button>
        </form>    
             <br></br>
             <div className='toggleBtn' onClick={studentForm}><h3 className='sky-h3'>Want to create a student account? Click Here</h3></div>
            </div>
        </div>
    )


}
    export default Registration