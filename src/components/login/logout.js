import React from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import {setUser} from '../../redux/authReducer'
import { withRouter, Link } from 'react-router-dom'
import './Login.scss'




const Logout = (props) =>{

    

    const handleLogout = () => {
    axios.delete("/auth/logout")
    .then( res => {
        props.setUser(null)
        props.history.push('/')
    }).catch( err => {
        console.log(err)
        alert("There was an issue logging out. Please try again.")
    })

    }

    return (
        <div>
             <>
            {props.authReducer.user ? <Link className='logout' onClick={handleLogout}>Log out</Link> 
            :
            <Link     
            to='/login'
           ><h3 className='signin'>Sign In</h3></Link> }               
        </>
        </div>
    )
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, {setUser})(Logout));

 
