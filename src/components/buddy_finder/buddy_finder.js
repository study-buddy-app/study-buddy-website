import { useState, useEffect } from "react";
import axios from "axios";
import "../buddy_finder/buddy_finder.scss";
import Google_maps from "../google-maps/Google_maps"



const Buddy_Finder = () => {
  const [tutorName, setTutorName] = useState();
  const [location, setLocation] = useState(null);
  const [tutorlist, setTutorList] = useState();
  const [description, setDescription] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [timezone, setTimeZone] = useState();
  const [subject, setSubject] = useState();
  const [state, setState] = useState();
  const [popList, setPopList] = useState();

 

  useEffect(() => {
    let subject_id = subject
    axios
      .put('/api/tutor/state/subjects', {state, subject_id})
      .then((res) => {
        setTutorList(res.data);
      })
      .catch((err) => console.log(err));
  }, [subject]);

  useEffect(()=>{
    axios.get('/api/subject')
    .then((res)=>{
        setPopList(res.data);
    })
    .catch((err)=> console.log(err))
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnClick = (e) =>{
    setTutorName(e.target.title)
  }
  

  const handleMeetupType = (e) => {
    const meetupType = e.target.value;
    setDescription(meetupType);
  };

  const handleSubjectChange = (e) => {
    const selSubject = e.target.value;
    setSubject(selSubject);
    setTutorName('')
  };
 

  const handleStart = (e) => {
    setStartTime(e.target.value);
  };

  const handleEnd = (e) => {
    setEndTime(e.target.value);
  };

  const locationOnChange = (locationString) =>{
    let getState = locationString.split(',')
    console.log('getState',getState)
    getState = getState[1]?.trim()
    setState(getState)
    console.log(locationString)
  }
  console.log(state)


  return (
    <div>
      <main className="page_Container">
        <div className="map_Container">
          <div className="map">
            <Google_maps locationOnChange={locationOnChange}/>
          </div>
          <div className="locate_buddy">
            <div className="tutor_search">

              <div className='tutors_ByLocation' >
              {tutorlist?.map((item)=>{ 
                  return (
                    <table className='tblTutors'>
                      <tr >
                        <td onClick ={handleOnClick} title={item.f_name+' '+item.l_name}>{item.f_name}</td>
                        <td key={item.subject_id}>{item.l_name}</td>
                        <td key={item.subject_id}>{item.email}</td>
                        <td key={item.subject_id}>{item.city},</td>
                        <td key={item.subject_id}>{item.state}</td>
                      </tr>
                    </table>)
                })}
              </div>
            </div>
            <div className="frmLabels"></div>
            <div className="loc_Container">
              {/* <input value={location} onChange={(e) => locationOnChange(e)}
                type="text"
                className="txtLocation txtbox"
                placeholder="Location"
              ></input> */}
            </div>
            <form className="frm_newEvent">
              <select
                className="txtSummary txtbox"
                onChange={(e) => handleMeetupType(e)}
              >
                <option value="Meeting Type">Choose a Meeting Type</option>
                <option value="Tutor">Find Tutor</option>
                <option value="Student">Find Student</option>
                <option value="Virtual">Virtual Meetup</option>
              </select>
              <br/><br/>
              <select
                className="txtSubject txtbox"
                
                onChange={(e) => handleSubjectChange(e)}
              >
                <option value="Choose a Field of Study">
                  Choose a Field of Study 
                </option>
                {popList?.map((topic)=>{
                  return(
                    <option key ={topic.subject_id} value={topic.subject_id} >{topic.subject}</option>
                  )
                })}
              </select>
              <br/><br/>
              <div className="lblDate startlabel">Start Date/Time</div>
            
              <input
                type="datetime-local"
                className="dtStart txtbox"
                placeholder="Your Name"
                onChange={(e) => handleStart(e)}
              ></input>
                <br/><br/>
              <br></br>
              <div className="lblDate endlabel">End Date/Time</div>
              <input
                type="datetime-local"
                className="dtEnd txtbox"
                placeholder="Your Name"
                onChange={(e) => handleEnd(e)}
              ></input>
                <br/><br/>
              <input
                type="text"
                className="txtTutor txtbox"
                placeholder="Select a Tutor from the List"
                defaultValue={tutorName}
              ></input>
                <br/><br/>
              <button
                onClick={handleSubmit}
                type="submit"
                className="btnSubmit button"
              >
                Add
              </button>
            </form>
            <div className="searchNow"></div>
          </div>
        </div>
        <div className="schedule_container">
          <div className="calendar_Container">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=MHJwZGxzbWN2aDVsb3BjYzFyc2ZiZ3Y3OThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%238E24AA&amp;showPrint=0&amp;showCalendars=0&amp;showTitle=0&amp;showDate=1&amp;showTz=1&amp;showTabs=0"
              width="100%"
              height="100%"
              frameborder="0"
              scrolling="no"
              title="calendar"
            ></iframe>
          </div>
          <div className="event_btn_container">
            <button className="btn_addEvent button">Edit</button>
            <button className="btn_addEvent button">Today</button>
            <button className="btn_addEvent button">Delete</button>
          </div>

          <div className="event_Item">
            <span>25</span> Meetup with George at 8pm
          </div>
          <div className="event_Item"></div>
          <div className="event_Item"></div>
          <div className="event_Item"></div>
        </div>
        <div className="motto">
          <h2>"With Study-Buddy my brain doesn't hurt as much!"</h2>
          <div className="author">
            <h4>-No one</h4>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Buddy_Finder;
