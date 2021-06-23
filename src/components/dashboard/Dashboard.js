import React, {useState, useEffect} from 'react'
import './Dashboard.scss'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {setBackpack} from '../../redux/backpackReducer'
import Backpack from './Backpack'



export default function Dashboard(props) {
    const [subjectArr, setSubjectArr] = useState([])
    const [search, setSearch] = useState('')
    const [askq, setAskq] = useState('')

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
        
        <div className='dashboard'>
             <div className='dashheader'></div>
            <div className='container'>
                <div className='column1'>
                    <div className='block1'>
                        <div className='greeting'>
                            {/* <i className="far fa-user-circle"></i> */}
                            <h1 className='h1'>Hi there</h1>
                        </div>
                        <br/><br/>
                        <div className='questionpage'>
                            <h3>Ask a question </h3>
                            <input className='askq' value={askq} onChange={(e) => setAskq(e.target.value)}/>
                            <br/><br/>
                            <button className='submit'onClick ={handleSubmit}>submit</button>
                        </div>
                        <br/><br/>
                        <div className='subjectslist'>
                        
                          <input type='text' placeholder='Choose your subjects' onChange= { e => setSearch(e.target.value)}></input>      
                        {filteredSubjects.map((subject) => {
                            return (
                            <div className ='onesubject' onClick={() => handleSubmit(subject.subject_id)}  key={subject.subject_id}>
                                <h5>{subject.subject}</h5>
                              
                            </div>
                                 )
                                })} 
                    </div>
                    

                
                    <div className='block2'>
                        <div className='virtual'>
                            <h3>Virtual Meetup</h3>
                            <p>Today's schedule</p>
                            <br/><br/>
                            <button><Link to='/virtualroom'>Virtual meeting</Link></button>
                            </div> 
                            <br/><br/>
                        <div className='meetup'>
                            <h3>In Person Meetup</h3>
                            <p>Today's schedule</p>
                            <br/><br/>
                            <button><Link to='/meetup'>Meetup</Link></button>
                            </div>
                        </div>
                </div>
                </div>
                <div className='column2'>
                    <div>
                        <Backpack />
                        </div>

                    <br/><br/>

                    <div className='tutorsearch'>
                    <input type='text' placeholder='choose a tutor' onChange= { e => setSearch(e.target.value)}></input>   
                    </div>
                    </div>
                    </div>
                    </div>
                  
             
            
        
    )
                            
}
