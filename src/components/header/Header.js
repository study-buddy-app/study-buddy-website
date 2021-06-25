import {Link, withRouter} from 'react-router-dom'
import '../header/Header.scss'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Logout from '../login/logout'


const Header = () => {
    return (
    <header>     
      <div className='H-secLeft'>
        <img className='logo' height='18%' width='18%' src='https://study-buddy-bucket.s3.us-east-2.amazonaws.com/Study+Buddy+logo+resize.png' alt='Study Buddy logo'/>
      </div>
      <div>
        <input className='searchBar' placeholder='Search'/>
      </div>

      <div className='H-secRight'>
        <Link className='links' to='/'><h3>HomePage</h3></Link>
        <Link className='links' to='/login'><h3>Login</h3></Link>
        <Link className='links' to='/registration'><h3>Register</h3></Link>
        <Link className='links' to='/aboutus'><h3>About Us</h3></Link>
        <Link className='links' to ='/buddyup'><h3>Meet Up</h3></Link> 
      </div>


      <div className="DropDown">
        <DropdownButton id="dropdown-basic-button" title={<h3 id="ham-icon"><GiHamburgerMenu/></h3>}> 
            <Dropdown.Item id='drop-item' as={Link} to="/">HomePage</Dropdown.Item>
            <Dropdown.Item id='drop-item' as={Link} to="/login">Login</Dropdown.Item>
            <Dropdown.Item id='drop-item' as={Link} to="/packages">About Us</Dropdown.Item>
        </DropdownButton>
      </div>
   </header>
  )
}

    export default withRouter(Header)
    

    