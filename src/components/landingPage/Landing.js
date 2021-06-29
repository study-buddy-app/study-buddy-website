import React from "react"
import "./Landing.scss"
import {Link} from 'react-router-dom'

const Landing = () => {
    return(
        <section className='landingpage'>
            <div className='landing-D1'>
                <div className='landing-leftDiv'>
                    <img className='landing-image'  src='https://study-buddy-bucket.s3.us-east-2.amazonaws.com/Study+Buddy.png' alt="study group"/>
                </div>
                
                <div className='landing-rightDiv-d1'>
                    <h1 className='rd1-text'>Don't study alone, 
                    Study together</h1>
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
                <h2>Collaborate with others <br/>
                on the same subject
                and <br/> 
                get assignments done faster!</h2>
                <br/><br/>
                <button className='landing-d1-btn'>Start the Process</button>
                </div>

                <div className='landing-rightDiv'>
                <img className="landing-image2" src='https://freevector-images.s3.amazonaws.com/uploads/vector/preview/40305/MAN_TELECONFERENCE_WITH_TEAM.jpg' alt='study group'/>
                </div>
            </div>

            <div className='landing-D3'>
                <div className='landing-leftDiv-d3'>
                    <img className= "landing-image3-1" src='https://study-buddy-bucket.s3.us-east-2.amazonaws.com/collaborate.PNG' alt='online learning'/>
                </div>

                <div className='landing-rightDiv-d3'>
                   
                    <h2 className='d3-text'>Find tutors in your area 
                    and schedule online or in person meetups. </h2>
        
                    <img className= "landing-image3-2" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4j194D-q7XVDB-dcRntD2LaMaHFe3s5bByA&usqp=CAU' alt='tutor'/>
                </div>
            </div>
            <div className="motto">
                <h2 className='review'>"With Study-Buddy my brain doesn't hurt as much!"</h2>
                <div className="author">
                    <h4 className='noone'>-No one</h4>
                </div>
                </div>
            <div className='landing-D4'>
                <div className='landing-D4-sec'>
                    <div className ='d4-text'>
            <h2>Sign up is easy.
                Click the link below to get started </h2>
                <h4>Must be 18 years old or older to join</h4>
                <br/><br/>
                <button className='landing-d1-btn'><Link to='/registration'>Register Now</Link></button>
                </div>
                <div className='landing-D4-img'>
                    <img className= "landing-image4" src='https://study-buddy-bucket.s3.us-east-2.amazonaws.com/sign+up+d4+study+buddy.PNG' alt='sign up'/>
                </div>
                </div>
            </div>
           
        </section>
    )
}
export default Landing