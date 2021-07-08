import React, {useState} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {setBackpack} from '../../redux/backpackReducer'
import {useEffect} from 'react'
import './Dashboard.scss'
import session from 'express-session'


export default function Backpack(props) {
  const [url, setUrl] = useState('')

      const {backpack} = useSelector((store) => store.backpackReducer)
      const {user} = useSelector((store)=> store.authReducer)
      const dispatch = useDispatch()
      let usertype = user.usertype
      
      
        useEffect(() => {
       if(usertype === 'student'){
          axios.get('/api/backpack')
            .then((res) => {
              console.log(res.data)
              dispatch(setBackpack(res.data))
            }).catch(err => {
              console.log(err)
            })
          }
       if(usertype === 'tutor'){
          axios.get('/api/tutor/backpack')
            .then((res) => {
              console.log(res.data)
              dispatch(setBackpack(res.data))
            }).catch(err => {
              console.log(err)
            })
          }
          }, [dispatch])
        
        
        const handleDeleteFromBackpack = (subject_id) => {
         if(usertype === 'student'){
          axios.delete(`/api/backpack/${subject_id}`)
            .then((res) => {
              dispatch(setBackpack(res.data))
            })
            .catch(err => {
              console.log(err)
            })
          }
          if(usertype === 'tutor'){
            axios.delete(`/api/backpack/tutor/${subject_id}`)
            .then((res) => {
              dispatch(setBackpack(res.data))
            })
            .catch(err => {
              console.log(err)
            })
          }
        }
      console.log('usertype', user.usertype)

        return (
            <div className ='backpack'>
              <div className='backpack-container'>
              <h3 className='backpack-h3'>Backpack</h3>
              <img className='backpack-image'  src="https://res.cloudinary.com/dgaapgd2f/image/upload/v1624370775/4030E576-5B89-41D6-801A-FA411B873F98_1_201_a_yidfyb.jpg" alt='backpack'/>
              </div>
              {backpack.map((subject) => {
                return(
                  <div  className='oneitem' key={subject.subject_id}>
                    <h4>{subject.subject}</h4>
                    
                    <div className = 'deletebackpackitem'>
                    <button className='remove' onClick={() => handleDeleteFromBackpack(subject.subject_id)}>delete</button>
                    </div>
                    </div>
                    )
                    
              })}
         
                  </div>
                )
            }
                
          
           
