import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {setBackpack} from '../../redux/backpackReducer'
import Backpack from '../dashboard/Backpack'
import TimeLogList from './TimeLogList';
import TodoApp from './Todo';
import './Tutordash.scss'


export default function Tutordash(props) {
    const [subjectArr, setSubjectArr] = useState([])
    const [search, setSearch] = useState('')
   

    const {user} = useSelector((store) => store.authReducer)
    const {backpack} = useSelector((store) => store.backpackReducer)


        const dispatch = useDispatch()

        useEffect(() => {
        axios.get('/api/subject')
        .then((res) => {
        setSubjectArr(res.data)
        })
        .catch(err => console.log(err))
        }, [])

        const handleSubmit = (subject_id) => {
            const subject = backpack.find((subject) => subject.subject_id === subject_id)
            console.log(subject_id)
            
              axios.post(`/api/backpack/${subject_id}`)
              .then((res) => {
              console.log(res.data, 'this is my data')
                dispatch(setBackpack(res.data))
              })
              .catch((err) => {
                console.log(err)
                if(err.response.status === 511){
            
                }
              })
           
                }
              
            
        
        const filteredSubjects = subjectArr.filter(subject => {
            return subject.subject.toLowerCase().includes(search.toLowerCase())
          })

    return (
        
        <div className='tutor_dashboard'>
            <div className='tutor_dashheader'></div>
            <div className='tutor_container'>
                <div className='tutor_column1'>
                    <div className='tutor_block1'>
                        <div className='tutor_greeting'>
                            <Link to='/tutorprofile' ><img className = 'tutor_userlogo' src = 'https://res.cloudinary.com/dgaapgd2f/image/upload/v1624410772/A912FD0D-3C1E-475B-B5DD-6138727912B9_1_201_a_vjozus.jpg' alt = 'userlogo'/></Link>
                            <h1 className='tutor_h1'>Hi there {`${user?.username}`}</h1>
                        </div>
                        <br/><br/>
                        <div className='tutor_calander'>
                            <iframe
                            src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=MHJwZGxzbWN2aDVsb3BjYzFyc2ZiZ3Y3OThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%238E24AA&amp;showTz=0&amp;showCalendars=1&amp;showTitle=0&amp;showPrint=1&amp;showTabs=0"
                            width="100%"
                            height="100%"
                            frameborder="0"
                            scrolling="no"
                            title="calendar"
                            ></iframe>              
                            <br/><br/>
                        </div>
                        <br/><br/>
                        <div className='hours'>
                            <h3 className='trackhours'>Hours</h3> 
                            <TimeLogList />
                        </div>
                    </div>
                    <div className='tutor_block2'>
                        <div className='tutor_virtual'>
                            <h3>virtual meetup</h3>
                            <br/><br/>
                            <button><Link to='/virtualroom'>virtual meeting</Link></button>
                        </div> 
                        <br/><br/>
                        <div className='tutor_meetup'>
                            <h3>In person meetup</h3>
                            
                            <br/><br/>
                            <button><Link to='/buddyup'>Schedule a meetup</Link></button>
                        </div>
                    </div>
                </div>
                <div className='tutor_column2'>
                    <div>
                        <Backpack />
                    </div>
                    <br/><br/>
                    <div className='tutor_subjectslist'>
                        <input  className='tutor_choose-subject'type='text' placeholder='Choose subjects' onChange= { e => setSearch(e.target.value)}></input>      
                        {filteredSubjects.map((subject) => {
                            return (
                            <div className ='tutor_onesubject' onClick={() => handleSubmit(subject.subject_id)}  key={subject.subject_id}>
                                <h5>{subject.subject}</h5>  
                            </div>
                                 )
                                })} 
                    </div>

                    <TodoApp />,

                    {window.scrollTo(0,0)}
                </div>
            </div>
        </div>
    )
}