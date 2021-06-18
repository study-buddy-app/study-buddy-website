import React from "react"
import "./Landing.scss"
const Landing = () => {
    return(
        <section>landingPage
            <div className='landing-D1'>
                <div className='landing-leftDiv'>
                    <h1 className='StdyBddy'>Study Buddy</h1>
                    <img height='60%' width='100%' src='https://www.princetonreview.com/cms-content/how-to-make-the-most-out-of-mcat-study-group.jpg' alt="study group"/>
                </div>
                
                <div className='landing-rightDiv'>
                    <h1>Don't study alone, Study together</h1>
                    <h4>A smarter way to study</h4>
                    <button className='landing-d1-btn'>Learn More</button>
                </div>
            </div>

            <div className='landing-D2'>
                <div className='landing-leftDiv'>
                <h2>Collaborate with others on the same subject<br/>
                and get assignments done faster!</h2>
                </div>

                <div className='landing-rightDiv'>
                <img height='50%' width='70%' src='https://www.takeyourclass.com/wp-content/uploads/2016/12/300-x-168-01-1-1280x720.png' alt='study group'/>
                </div>
            </div>

            <div className='landing-D3'>
                <div className='landing-leftDiv'>
                    <img height='60%' width='80%' src='https://freevector-images.s3.amazonaws.com/uploads/vector/preview/40305/MAN_TELECONFERENCE_WITH_TEAM.jpg' alt='online learning'/>
                </div>

                <div className='landing-rightDiv'>
                    <h2>Chat and and study online or schedule in person study group meet-ups with other users<br/>
                    and on staff tutors in your area!</h2>
                    <img height='30%' width='50%' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4j194D-q7XVDB-dcRntD2LaMaHFe3s5bByA&usqp=CAU' alt='tutor'/>
                </div>
            </div>

            <div className='landing-D4'>
                <div className='landing-D4-sec'>
            <h2>Sign up is easy. <bk/> 
                Click the link below to get started </h2>
                <h4>Must be 18 years old or older to join</h4>
                <button className='landing-d1-btn'>Register Now</button>
                </div>
            </div>
        </section>
    )
}
export default Landing