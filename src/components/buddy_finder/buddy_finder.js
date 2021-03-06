import { useState, useEffect } from "react";
import axios from "axios";
import "../buddy_finder/buddy_finder.scss";
import Google_maps from "../google-maps/Google_maps";
import { user } from "../../redux/authReducer";
import { useSelector } from "react-redux";

const Buddy_Finder = () => {
  let [tutorName, setTutorName] = useState();
  const [location, setLocation] = useState(null);
  const [tutorlist, setTutorList] = useState();
  const [description, setDescription] = useState();
  let [startTime, setStartTime] = useState();
  let [endTime, setEndTime] = useState();
  const [appointments, setAppointments] = useState();
  let [subject, setSubject] = useState();
  const [state, setState] = useState();
  const [popList, setPopList] = useState();
  const { user } = useSelector((store) => store.authReducer);

  useEffect(() => {
    let subject_id = subject;
    if (description === "Tutor") {
      axios
        .put("/api/subject/tutor/state", { state, subject_id })
        .then((res) => {
          setTutorList(res.data);
        })
        .catch((err) => console.log(err));
    }
    if (description === "Student") {
      axios
        .put("/api/subject/student/state", { state, subject_id })
        .then((res) => {
          setTutorList(res.data);
        })
        .catch((err) => console.log(err));
    }
    if (description === "Virtual") {
      axios
        .put("/api/subject/student/virtual", { subject_id })
        .then((res) => {
          setTutorList(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [subject, description]);
 console.log('tutorList', tutorlist)
  useEffect(() => {
    const student_id = user.student_id;
    axios
      .get(`/api/subject/menu/${student_id}`)
      .then((res) => {
        setPopList(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  useEffect(() => {
    console.log('I\'ve started')
    const student_id = user.student_id;
    axios
      .get(`/api/session/appointment/${student_id}`)
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("Appointments", appointments);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sch_subject = subject;
    const event_start = startTime;
    const event_end = endTime;
    const buddy_choice = tutorName;
    const student_id = user.student_id;
    axios
      .post(`/api/sessions/appointments/${user.student_id}`, {
        description,
        sch_subject,
        event_start,
        event_end,
        buddy_choice,
        student_id,
      })
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => console.log(err));
    subject = "";
    startTime = "";
    endTime = "";
    tutorName = "";
  };

  const handleOnClick = (e) => {
    setTutorName(e.target.title);
  };

  const handleMeetupType = (e) => {
    const meetupType = e.target.value;
    setDescription(meetupType);
  };
  console.log("meetup Type", description);

  const handleSubjectChange = (e) => {
    const selSubject = e.target.value;
    setSubject(selSubject);
    setTutorName("");
    console.log("e", e);
  };

  console.log("subject_id", subject);

  const handleStart = (e) => {
    setStartTime(e.target.value);
  };

  const handleEnd = (e) => {
    setEndTime(e.target.value);
  };

  const locationOnChange = (locationString) => {
    let getState = locationString.split(",");
    console.log("getState", getState);
    getState = getState[1]?.trim();
    setState(getState);
    console.log(locationString);
  };
  console.log("state", state);

  return (
    <div>
      <main className="page_Container">
        <div className="map_Container">
          <div className="map">
            <Google_maps locationOnChange={locationOnChange} />
          </div>
          <div className="locate_buddy">
            <div className="tutor_search">
              <div className="tutors_ByLocation">
                <table className="tblTutors">
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>State</th>
                  {tutorlist?.map((item) => {
                    return (
                      <tr>
                        <td
                          onClick={handleOnClick}
                          title={
                            item.f_name +
                            " " +
                            item.l_name +
                            "  / " +
                            item.email
                          }
                        >
                          {item.f_name}
                        </td>
                        <td
                          key={item.subject_id}
                          onClick={handleOnClick}
                          title={
                            item.f_name +
                            " " +
                            item.l_name +
                            "  / " +
                            item.email
                          }
                        >
                          {item.l_name}
                        </td>
                        <td
                          key={item.subject_id}
                          onClick={handleOnClick}
                          title={
                            item.f_name +
                            " " +
                            item.l_name +
                            "  / " +
                            item.email
                          }
                        >
                          {item.email}
                        </td>
                        <td key={item.subject_id}>{item.city},</td>
                        <td key={item.subject_id}>{item.state}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
            <div className="frmLabels"></div>
            <div className="loc_Container"></div>
            <form className="frm_newEvent">
              <div className="form">
                <select
                  className="txtSummary txtbox"
                  onChange={(e) => handleMeetupType(e)}
                >
                  <option value="Meeting Type">Choose a Meeting Type</option>
                  <option value="Tutor">Find Tutor</option>
                  <option value="Student">Find Student</option>
                  <option value="Virtual">Virtual Meetup</option>
                </select>
                <br />
                <br />
                <select
                  className="txtSubject txtbox"
                  onChange={(e) => handleSubjectChange(e)}
                >
                  <option value="Choose a Field of Study">
                    Choose a Field of Study
                  </option>
                  {popList?.map((topic) => {
                    return (
                      <option key={topic.subject_id} value={topic.subject_id}>
                        {topic.subject}
                      </option>
                    );
                  })}
                </select>
                <br />
                <br />
                <div className="lblDate startlabel">Start Date/Time</div>

                <input
                  type="datetime-local"
                  className="dtStart txtbox"
                  placeholder="Your Name"
                  onChange={(e) => handleStart(e)}
                ></input>
                <br />
                <br />
                <br></br>
                <div className="lblDate endlabel">End Date/Time</div>
                <input
                  type="datetime-local"
                  className="dtEnd txtbox"
                  placeholder="Your Name"
                  onChange={(e) => handleEnd(e)}
                ></input>
                <br />
                <br />
                <input
                  type="text"
                  className="txtTutor txtbox"
                  placeholder="Select a Tutor from the List"
                  defaultValue={tutorName}
                ></input>
                <br />
                <br />
              </div>
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
              src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=MHJwZGxzbWN2aDVsb3BjYzFyc2ZiZ3Y3OThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%238E24AA&amp;showTz=0&amp;showCalendars=1&amp;showTitle=0&amp;showPrint=1&amp;showTabs=0"
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
            <table className="tbl_event_Item">
              {appointments?.map((item) => {
                let appDate = new Date(item.event_start);
                return (
                  <tr>
                    <td>
                      <span>
                        {appDate.getMonth(`${item.event_start}`) +
                          1 +
                          "-" +
                          appDate.getDate(item.event_start)}
                      </span>
                    </td>
                    <td>{item.subject}</td>
                    <tr>
                      <td>{item.buddy_choice}</td>
                    </tr>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Buddy_Finder;
