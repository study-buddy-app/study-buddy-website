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
    const [search, setSearch] = useState("")
    const [meetup, setMeetup] = useState();

    const {user} = useSelector((store) => store.authReducer)
    const {backpack} = useSelector((store) => store.backpackReducer)


        const dispatch = useDispatch()
  
        useEffect(() => {
            console.log('I\'m firing')
            axios.get('/api/backpack')
              .then((res) => {
                console.log(res.data)
                dispatch(setBackpack(res.data))
              }).catch(err => {
                console.log(err)
              })
            }, [])

          useEffect(() => {
            axios
              .get(`/api/session/current/appointment/${user.tutor_id}`)
              .then((appointment) => {
                setMeetup(appointment.data);
              })
              .catch((err) => console.log(err));
          }, []);

        useEffect(() => {
        axios.get('/api/subject')
        .then((res) => {
        setSubjectArr(res.data)
        })
        .catch(err => console.log(err))
        }, [])

        const handleSubmit = (subject_id) => {
            const subject = backpack.find((subject) => subject.subject_id === subject_id)
            console.log("subject_id", subject_id)
           
              axios.post(`/api/backpack/${user.tutor_id}`,`${subject_id}`)
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
                            <Link to='/tprofile' ><img className = 'tutor_userlogo' src = 'https://res.cloudinary.com/dgaapgd2f/image/upload/v1624410772/A912FD0D-3C1E-475B-B5DD-6138727912B9_1_201_a_vjozus.jpg' alt = 'userlogo'/></Link>
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
                            <h3 className='tutor-h3-virtual'>See who else is online</h3>
                            <br/><br/>
                            <Link to='/virtualroom'> <button className="tutor-button">virtual meeting</button></Link>
                        </div> 
                        <br/><br/>
                    
                        <div className="tutor_meetup">
                            <h3 className='tutor-h3-meetup'>In person meetup</h3>

                            <br /><br />
                            {meetup?.map((item) => {
                            let aptDate = new Date(item.event_start);
                            return (
                                <table className='lastEntry'>
                                <tr>
                                    <td><h4>
                          {aptDate.getMonth(item.event_start) +
                            1 +
                            "-" +
                            aptDate.getDate(item.event_start) +
                            "-" +
                            aptDate.getFullYear(item.event_start)} 
                            {"  "}
                            {item.description}
                            {" Meetup"}
                            </h4>
                        </td>
                        </tr>
                        <tr>
                        <td><span>{item.subject}</span></td>
                        </tr>
                        <tr>
                        <td><span>{item.buddy_choice}</span></td>
                      </tr>
                    </table>
                  );
                })}
                 <br/><br/>
                 <br/><br/>
                 <br/><br/>
                 <Link to="/buddyup"><button className="tutor-button">buddy up</button></Link>
              </div>
              <br/><br/>
              <TodoApp />,
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

                    {window.scrollTo(0,0)}
                </div>
            </div>
        </div>
    )
}