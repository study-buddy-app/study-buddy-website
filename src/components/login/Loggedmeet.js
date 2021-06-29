import React from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import {setUser} from '../../redux/authReducer'
import { withRouter, Link } from 'react-router-dom'
import './Login.scss'
import '../header/Header.scss'


const Loggedmeet = (props) =>{ 

    return (
        <div>
             <>
            {props.authReducer.user ? <Link to='/buddyup' className= 'signin' ><h3>Meet Up</h3></Link>
            :
            <Link     
            to='/registration'
            className='signin'
            onClick={props.closeMobileMenu}
           ><h3>Register</h3></Link> }               
        </>
        </div>
    )
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, {setUser})(Loggedmeet));

 