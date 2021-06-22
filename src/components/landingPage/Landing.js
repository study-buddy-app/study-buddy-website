import React from "react"
import "./Landing.scss"
import {Link} from 'react-router-dom'

const Landing = () => {
    return(
        <section className='landingpage'>
            <div className='landing-D1'>
                <div className='landing-leftDiv'>
                    <h1 className='StdyBddy'>Study Buddy</h1>
                    <img className='landing-image' height='75%' width='90%' src='https://study-buddy-bucket.s3.us-east-2.amazonaws.com/Study+Buddy.png' alt="study group"/>
                </div>
                
                <div className='landing-rightDiv-d1'>
                    <h1 className='rd1-text'>Don't study alone, Study together</h1>
                    <h4>A smarter way to study</h4>
                    <br/><br/>
                    <button className='landing-d1-btn'>Learn More</button>
                </div>
            </div>
            <div className='sentence'>
                <h2 className='sentence-1'>A Single Solution for all Your Study Needs</h2>
               
            </div>
            <div className='landing-D2'>
                <div className='landing-leftDiv'>
                <h2>Collaborate with others on the same subject<br/>
                and get assignments done faster!</h2>
                <button className='landing-d1-btn'>Start the Process</button>
                </div>

                <div className='landing-rightDiv'>
                <img height='90%' width='60%' src='https://freevector-images.s3.amazonaws.com/uploads/vector/preview/40305/MAN_TELECONFERENCE_WITH_TEAM.jpg' alt='study group'/>
                </div>
            </div>

            <div className='landing-D3'>
                <div className='landing-leftDiv-d3'>
                    <img height='80%' width='50%' src='https://study-buddy-bucket.s3.us-east-2.amazonaws.com/collaborate.PNG' alt='online learning'/>
                </div>

                <div className='landing-rightDiv-d3'>
                    <h2 className='d3-text'>Chat and and study online or schedule in person study group meet-ups with other users<br/>
                    and on staff tutors in your area!</h2>
                    <img height='40%' width='60%' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4j194D-q7XVDB-dcRntD2LaMaHFe3s5bByA&usqp=CAU' alt='tutor'/>
                </div>
            </div>

            <div className='landing-D4'>
                <div className='landing-D4-sec'>
                    <div>
            <h2>Sign up is easy. <bk/> 
                Click the link below to get started </h2>
                <h4>Must be 18 years old or older to join</h4>
                <br/><br/>
                <button className='landing-d1-btn'><Link to='/registration'>Register Now</Link></button>
                </div>
                <div className='landing-D4-img'>
                    <img height='90%' width='50%' src='https://study-buddy-bucket.s3.us-east-2.amazonaws.com/sign+up+d4+study+buddy.PNG' alt='sign up'/>
                </div>
                </div>
            </div>
           
        </section>
    )
}
export default Landing