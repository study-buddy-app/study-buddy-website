import { useState, useEffect } from "react";
import axios from "axios";
import "./buddy_finder.scss";
import Google_maps from "../google-maps/Google_maps"


const Buddy_Finder = () => {
  const [tutorName, setTutorName] = useState();
  const [location, setLocation] = useState();
  const [tutorlist, setTutorList] = useState();
  const [description, setDescription] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [timezone, setTimeZone] = useState();
  const [subject, setSubject] = useState();
  const [state, setState] = useState("")

 

  // const subject_id = 20;

  useEffect(() => {
    let state ="TX";
    let subject_id = 20;
    axios
      .put('/api/tutor/state/subjects', {state, subject_id})
      .then((res) => {
        setTutorList(res.data);
      })
      .catch((err) => console.log(err));
  }, [state]);

  console.log("Tutorlist", tutorlist);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleMeetupType = (e) => {
    const meetupType = e.target.value;
    setDescription(meetupType);
  };

  const handleSubjectChange = (e) => {
    const selSubject = e.target.value;
    setSubject(selSubject);
  };

  const handleStart = (e) => {
    setStartTime(e.target.value);
  };

  const handleEnd = (e) => {
    setEndTime(e.target.value);
  };

  return (
    <div>
      <main className="page_Container">
        <div className="map_Container">
          <div className="map">
            <Google_maps/>
          </div>
          <div className="locate_buddy">
            <div className="tutor_search">
              <textarea
                className="txtTutorSearch"
                rows="10"
                cols="50"
                placeholder="Enter a location and this area will show you the available tutors or study buddies. Click on the name to add it to the right."
              >
                {tutorlist}
              </textarea>
            </div>
            <div className="frmLabels"></div>
            <div className="loc_Container">
              <input
                type="text"
                className="txtLocation txtbox"
                placeholder="Location"
              ></input>
            </div>
            <form className="frm_newEvent">
              <select
                className="txtSummary txtbox"
                onChange={(e) => handleMeetupType(e)}
              >
                <option value="Meeting Type">Choose a Meeting Type</option>
                <option value="In Person">In Person</option>
                <option value="Virtual">Virtual</option>
              </select>
              <select
                className="txtSubject txtbox"
                onChange={(e) => handleSubjectChange(e)}
              >
                <option value="Choose a Field of Study">
                  Choose a Field of Study
                </option>
                <option value="Accounting and Finance">
                  Accounting and Finance
                </option>
                <option value="Art">Art</option>
                <option value="Beauty Therapy">Beauty Therapy</option>
                <option value="Business and Economics">
                  Business and Economics
                </option>
                <option value="MChild Care">Child Care</option>
                <option value="Computer Science">Computer Studies</option>
                <option value="Event Management">Event Management</option>
                <option value="Forensic Investigation">
                  Forensic Investigation
                </option>
                <option value="General Management">General Management</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Journalism">Journalism</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Nursing">Nursing</option>
                <option value="Office Administration and Secretarial Studies">
                  Office Administration and Secretarial Studies
                </option>
                <option value="Paralegal Studies">Paralegal Studies</option>
                <option value="Photography">Photography</option>
                <option value="Project Management">Project Management</option>
                <option value="Sport Studies and Coaching">
                  Sport Studies and Coaching
                </option>
                <option value="Technical Studies">
                  Technical Studies (plumbing, electrical work, etc.)
                </option>
                <option value="Writing">Writing</option>
              </select>
              <div className="lblDate startlabel">Start Date/Time</div>
              <input
                type="datetime-local"
                className="dtStart txtbox"
                placeholder="Your Name"
                onChange={(e) => handleStart(e)}
              ></input>
              <br />
              <br></br>
              <div className="lblDate endlabel">End Date/Time</div>
              <input
                type="datetime-local"
                className="dtEnd txtbox"
                placeholder="Your Name"
                onChange={(e) => handleEnd(e)}
              ></input>
              <input
                type="text"
                className="txtTutor txtbox"
                placeholder="Select a Tutor from the List"
              ></input>
              <button
                onClick={handleSubmit}
                type="submit"
                className="btnSubmit button"
              >
                Add Event
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
            <button className="btn_addEvent button">Edit Event</button>
            <button className="btn_addEvent button">Today</button>
            <button className="btn_addEvent button">Del Event</button>
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
        <div className="chat_Container"></div>
      </main>
    </div>
  );
};
export default Buddy_Finder;
