import React, {useState, useEffect} from 'react'
import './Dashboard.scss'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {setBackpack} from '../../redux/backpackReducer'
import Backpack from './Backpack'
import { app } from './firebase'
import TodoApp from '../tutorDash/Todo'


export default function Dashboard(props) {
  const [subjectArr, setSubjectArr] = useState([]);
  const [search, setSearch] = useState("");
  const [meetup, setMeetup] = useState();
  const [fileUrl, setFileUrl] = useState(null)
  const [users, setUsers] = useState([])

    const {user} = useSelector((store) => store.authReducer)
    const {backpack} = useSelector((store) => store.backpackReducer)

    const db = app.firestore()
        
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
         
          axios.get(`/api/session/current/appointment/${user.student_id}`)
            .then((appointment) => {
              setMeetup(appointment.data);
            })
            .catch((err) => console.log(err));
        }, []);
      

        useEffect(() => {
          axios
            .get("/api/subject")
            .then((res) => {
              setSubjectArr(res.data);
            })
            .catch((err) => console.log(err));
        }, []);

        const handleSubmit = (subject_id) => {
          const subject = backpack.find(
            (subject) => subject.subject_id === subject_id
          );
          console.log(subject_id);
      
          axios
            .post(`/api/backpack/${user.student_id}`,{subject_id})
            .then((res) => {
              console.log(res.data, "this is my data");
              dispatch(setBackpack(res.data));
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status === 511) {
              }
            });
        };
            const handleChange = async (e)=> {
                const file = e.target.files[0]
                const storageRef = app.storage().ref()
                const fileRef = storageRef.child(file.name)
                await fileRef.put(file)
                setFileUrl(await fileRef.getDownloadURL())
            
                }
            
            
            const onSubmit = (e) => {
                e.preventDefault()
                const username = e.target.username.value
                if(!username){
                    return
                }
                db.collection("files").doc(username).set({
                    avatar:fileUrl,
                    name:username
                    
                })   
            }
            useEffect(() => {
                const fetchUsers = async () => {
                    const usersCollection = await db.collection('files').get()
                    setUsers(usersCollection.docs.map(doc => {
                        return doc.data()
                    }))
                }
                fetchUsers()
            }, [])

        const filteredSubjects = subjectArr.filter(subject => {
            return subject.subject.toLowerCase().includes(search.toLowerCase())
          })

    return (
        
        <div className='dashboard'>
            <div className='dashheader'></div>
            <div className='container'>
                <div className='column1'>
                    <div className='block1'>
                        <div className='greeting'>
                           <Link to='/profile' ><img className = 'userlogo' src = 'https://res.cloudinary.com/dgaapgd2f/image/upload/v1624410772/A912FD0D-3C1E-475B-B5DD-6138727912B9_1_201_a_vjozus.jpg' alt = 'userlogo'/></Link>
                            <h1 className='h1'>Hi there {`${user?.username}`} </h1>
                        </div>
                        <br/><br/>
                        <div className='uploads'>
                            <h3>Upload your paper</h3>
                            {/* <progress vlaue={progress} min="0" max="100"/> */}
                            <br/><br/>
                        <>
                            <form onSubmit= {onSubmit}>
                                <input type ="file" onChange ={handleChange} />
                                <input type ="text" name= "username" placeholder="NAME"/>
                                <button>upload</button>
                            </form>
                            <ul>
                                {users.map(user => {
                                    return (
                                        <li className="li-tag" key={user.name}>
                                        {/* <img width="100" height="100" src={file.avatar} alt={file.name}/> */}
                                        <p>{user.name}</p>
                                        </li>
                                    )
      
                                })}  
                            </ul>
                         </>
                            <br/><br/>  
                        </div>
                        <br/><br/>
                        <div className='calander'>
                        <iframe
                            src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=MHJwZGxzbWN2aDVsb3BjYzFyc2ZiZ3Y3OThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%238E24AA&amp;showPrint=0&amp;showCalendars=0&amp;showTitle=0&amp;showDate=1&amp;showTz=1&amp;showTabs=0"
                            width="100%"
                            height="100%"
                            frameborder="0"
                            scrolling="no"
                            title="calendar"
                            ></iframe>
                        </div>
                    </div>
                    <div className='block2'>
                        <div className='virtual'>
                            <h3>virtual meetup</h3>
                            <br/><br/>
                            <button><Link to='/virtualroom'>virtual room</Link></button>
                        </div> 
                        <br/><br/>
                        <div className="meetup">
                <h3>In person meetup</h3>

                <br />
                <br />
                <button>
                  <Link to="/buddyup">buddy up</Link>
                </button>
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
              </div>
                    </div>
                </div>
                <div className='column2'>
                    <div>
                        <Backpack />
                    </div>
                    <br/><br/>
                    <div className='subjectslist'>
                        <input  className='choose-subject'type='text' placeholder='Choose subjects' onChange= { e => setSearch(e.target.value)}></input>      
                        {filteredSubjects.map((subject) => {
                            return (
                            <div className ='onesubject' onClick={() => handleSubmit(subject.subject_id)}  key={subject.subject_id}>
                                <h5>{subject.subject}</h5>
                            </div>
                                 )
                                })} 
                    </div>
                    <TodoApp />
                  {window.scrollTo(0,0)}
                </div>
            </div>
        </div>       
        );
      }
    