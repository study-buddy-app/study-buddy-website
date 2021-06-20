import React from 'react'
import './Dashboard.scss'
import { Link } from 'react-router-dom'



export default function Dashboard() {
    return (
        <div className='dashboard'>
            <div className='virtual'>
                <h3>VIRTUAL MEETUP</h3>
                <p>Today's schedule</p>
                <br/><br/>
                <button><Link to='/virtualroom'>go to meeting room</Link></button>
                </div>

            <div className='tutorsearch'>FIND A TUTOR</div>
            <div className='questionpage'>ASK A QUESTION</div>
            <div className='subjectslist'>CHOOSE SUBJECTS</div>
            <div className='meetup'>
                <h3>IN PERSON MEETUP</h3>
                <p>Today's schedule</p>
                <br/><br/>
                <button><Link></Link></button>
                </div>
            <div className='backpack'>Backpack</div>
        </div>
    )
}
