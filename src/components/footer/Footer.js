import React from 'react'
import './Footer.scss'
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

export default function Footer() {
    return (
        <div>
          <footer>
            <h5>CONTACT US</h5>
            <br/> <br/>
            <h6>Available 9AM-6PM E.S.T.</h6>
            <br/> <br/>
            <h6>Study.Buddy@gmail.com</h6>
            <br/> <br/>
            <div>
          <AiFillFacebook />
          <AiFillInstagram />
          <AiOutlineTwitter />
          </div>
         
        
          </footer>  
        </div>
    )
}


