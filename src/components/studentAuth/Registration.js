import {useState} from 'react'
import axios from 'axios'
import {setUser} from '../../redux/authReducer'
import {setBackpack} from '../../redux/backpackReducer'
import { useDispatch } from 'react-redux'
import '../studentAuth/Registration.scss'



const Registration = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [f_name, setF_name] = useState('')
    const [l_name, setL_name] = useState('')
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('')
    const [usertype, setUsertype] = useState('')
    const dispatch = useDispatch()
    const student = () => setUsertype('Student')
    // const tutor = () => setUsertype('Tutor')
    const [studentColor, setstudentColor] = useState('')
    // const [tutorColor, setTutorColor] = useState('')



    const handleRegister = (e) => {
        e.preventDefault()
        axios.post('/auth/register', { username, password, usertype, email, age, f_name, l_name})
        .then((res) =>{
            dispatch(setUser(res.data))
            axios.get('/api/backpack')
            .then((response) => {
                dispatch(setBackpack(response.data))
                props.history.push('/')
            })
        })
    }
    console.log(handleRegister)

    const colorStudent = () => {
        setstudentColor(!studentColor)
    }
    // const colorTutor = () => {
    //     setTutorColor(!tutorColor)
    // }
    let  btn_student = studentColor ? "blueButton" : "normButton";
    // let  btn_tutor = tutorColor ? "blueButton" : "normButton";

    const handleStudent = () => {
        student()
        colorStudent()
    }

    // const handleTutor = () => {
    //     tutor()
    //     colorTutor()
    // }


    

    return (
        <div className='register-container'>
             <form className="register-form" onSubmit={handleRegister}>
                <input  value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"required/>
                <input  value={f_name} onChange={(e) => setF_name(e.target.value)} placeholder="Enter first name"required/>
                <input  value={l_name} onChange={(e) => setL_name(e.target.value)} placeholder="Enter last name"required/>
                <input  value={age} onChange={(e) => setAge(e.target.value)} placeholder="Submit age must be 18+" type="number"  required/>
                <input  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" type="email" required/>
                <input  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" type="password" required/>
                Confrim you are a Student
                <div className={btn_student} onClick={handleStudent}>Yes</div>
                 <button><h4>Sign Up</h4></button>
             </form>    
        </div>
    )


}
    export default Registration