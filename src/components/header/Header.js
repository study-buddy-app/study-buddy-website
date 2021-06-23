import {Link, withRouter} from 'react-router-dom'
import '../header/Header.scss'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Logout from '../login/logout'


const Header = () => {
    return (
    <header>     
      <div className='H-secLeft'>
        <img className='logo' height='80%' width='40%' src='https://study-buddy-bucket.s3.us-east-2.amazonaws.com/Study+Buddy+logo+resize.png' alt='Study Buddy logo'/>
      </div>
      <div>
        <input className='searchBar' placeholder='Search'/>
      </div>

      <div className='H-secRight'>
        <Link className='links-home' to='/'><h1>HomePage</h1></Link>

        <Link className='links-aboutus' to= '/aboutus'><h1>About Us</h1></Link>
        <Link className='links-logout' to='/'><h3 ><Logout /></h3></Link>
      
        

        <Link className='links' to='/registration'><h1>Register</h1></Link>
        <Link className='links' to='/login'><h1>Login</h1></Link>
        <Link className='links'><h1>About Us</h1></Link>
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
    

    