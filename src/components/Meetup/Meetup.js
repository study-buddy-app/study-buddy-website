import {useState} from 'react'
import axios from 'axios'
import './meetup.scss'

const  Meetup = ()=>{

return(
<div>
<main className="page_Container">
<div className='map_Container'>
    <div className="map">I AM MAP</div>
    <div className='locate_buddy'>
    <div className='tutor_search'>
        <textarea className ='txtTutorSearch' rows='10' cols='50' placeholder='Enter a location and this area will show you the available tutors or study buddies'></textarea>
[5:12 PM]
</div>
    <div className='frmLabels'>LABELS</div>
     <form className='frm_newEvent' >
     <input type='text' className='txtLocation txtbox' placeholder='Location'></input>
     <input type='text' className='txtSummary txtbox' placeholder='Brief Description'></input>
     <input type='text' className='txtSubject txtbox' placeholder='What is the subject of the session'></input>
     <input type='datetime-local' className='dtStart txtbox' placeholder='Your Name'></input>
     <input type='datetime-local' className='dtEnd txtbox' placeholder='Your Name'></input>
     <input type='text' className='txtTutor txtbox' placeholder='Select a Tutor from the List'></input>
     </form> 
     <div className='searchNow'></div> 
    </div>
</div>
<div className = 'schedule_container'>
    <div className ='calendar_Container'>
    <iframe src="https://calendar.google.com/calendar/embed?src=mystudybuddyinfo%40gmail.com" width="100%" height="300" frameborder="0" scrolling="no"></iframe>
    </div>
    <div className='event_btn_container'>
    <button  className="btn_addEvent button">Edit Event</button>
    <button  className="btn_addEvent button">Add Event</button>
    <button  className="btn_addEvent button">Del Event</button>
    </div>
    <div className='event_Item'>Meetup with George at 8pm</div>
    <div className='event_Item'></div>
    <div className='event_Item'></div>
    <div className='event_Item'></div>
</div>
</main>
</div>
)
}
export default Meetup