import React from 'react'
import {connect, useSelector} from 'react-redux';
import axios from 'axios'
import {setUser} from '../../redux/authReducer'
import { withRouter, Link } from 'react-router-dom'
import './Login.scss'
import '../header/Header.scss'



const Loggeddash = (props) =>{ 
    const {user} = useSelector((store) => store.authReducer)

    return (
        <div>
          
            {props.authReducer.user && (user.usertype === 'student') ?
             <Link to='/dashboard' className= 'signin' ><h3>Dashboard</h3></Link>
            : props.authReducer.user && (user.usertype === 'tutor') ? 
            <Link to='/tutordash' className= 'signin' ><h3>Dashboard</h3></Link>      
            :
            <Link to='/'className='signin' onClick={props.closeMobileMenu}><h3>Home</h3></Link>  }
                 
          
        </div>
    )
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, {setUser})(Loggeddash));

 