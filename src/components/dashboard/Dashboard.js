import React, {useState, useEffect} from 'react'
import './Dashboard.scss'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {setBackpack} from '../../redux/backpackReducer'
import Backpack from './Backpack'
import { storage } from './firebase'
// import 'antd/dist/antd.css'




export default function Dashboard(props) {
    const [subjectArr, setSubjectArr] = useState([])
    const [search, setSearch] = useState('')
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)


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

                const handleChange = e => {
                    if (e.target.files[0]){
                        setImage(e.target.files[0]);
                
                    }
                }
                const handleUpload = () => {
                    const uploadTask = storage.ref(`images/${image.name}`).put(image);
                    uploadTask.on(
                        "state_changed",
                        snapshot => {
                            const progress = Math.round (
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            )
                            setProgress(progress)

                        },
                        error => {
                            console.log(error);
                        },
                        () => {
                            storage
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            // axios.post(`/api/backpack/${url}`)
                            .then(url => {
                                // console.log(res.data, 'this is my data')
                                //   dispatch(setBackpack(res.data))
                                setUrl(url)
                                })
                              
                            })
                
                        }
                    
                  
    
 
        
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
                        <div className='questionpage'>
                            <h3>Upload your paper</h3>
                            <progress vlaue={progress} max="100"/>
                            <br/><br/>
                                <input
                                    type="file"
                                    onChange={handleChange}
                                    />
         
                        <button onClick={handleUpload}>Upload</button>
                        {url}
                        <img className="img" src ={url} alt ="file upload" />
         
                        </div>
                        <br/><br/>
                        <div className='tutorsearch'>
     
                        <iframe
                            src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=MHJwZGxzbWN2aDVsb3BjYzFyc2ZiZ3Y3OThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%238E24AA&amp;showPrint=0&amp;showCalendars=0&amp;showTitle=0&amp;showDate=1&amp;showTz=1&amp;showTabs=0"
                            width="100%"
                            height="100%"
                            frameborder="0"
                            scrolling="no"
                            title="calendar"
                            ></iframe>
                        </div>
                        
                
                    <div className='block2'>
                        <div className='virtual'>
                            <h3>virtual meetup</h3>
                            <br/><br/>
                            <button><Link to='/virtualroom'>virtual rooms</Link></button>
                            </div> 
                            <br/><br/>
                        <div className='meetup'>
                            <h3>In person meetup</h3>
                           
                            <br/><br/>
                            <button><Link to='/buddyup'>buddy up</Link></button>
                            </div>
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

                  {window.scrollTo(0,0)}
                    </div>
                    </div>
                    </div>
                  
             
            
        
    )
                            
}

