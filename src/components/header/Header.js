import {Link, withRouter} from 'react-router-dom'
import {useState} from "react"
import '../header/Header.scss'
import '../login/Login.scss'
import Logout from '../login/logout'


const Header = () => {
  const [click, setClick] = useState(false)


  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

    return (
      <>
    <header className='header'>    
        <div className='header-container'>
          <Link to='/' onClick={closeMobileMenu}>
          <img   className ="logo"src='https://study-buddy-bucket.s3.us-east-2.amazonaws.com/Study+Buddy+logo+resize.png' alt='Study Buddy logo'/>
          </Link>  
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
           </div>
           <div>
            <input className='searchBar' placeholder='Search'/>
          </div>
           <ul className={click ? 'nav-menu active' : 'nav-menu'}>
           <li className='nav-item'>
           <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                <h3>Home</h3> 
               </Link>
          </li>

          <li className='nav-item'>
              <Link
                to='/aboutus'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <h3>About Us</h3>
              </Link>
          </li>
          <li className='nav-item'>
              <Link
                to='/buddyup'
                className='nav-links'
                onClick= {closeMobileMenu}
                >
                <h3>Meet Up</h3>
              </Link>
          </li>
          <li className='nav-links'>
            <Logout closeMobileMenu={closeMobileMenu} />  
            <li to='/dashboard'> <i className="far fa-user-circle"></i></li>
          </li>
    
      
        </ul>
 
      </div> 
   </header>
   </>
  )
}

   
       
      
        
 


      {/* <div className="DropDown">
        <DropdownButton id="dropdown-basic-button" title={<h3 id="ham-icon"><GiHamburgerMenu/></h3>}> 
            <Dropdown.Item id='drop-item' as={Link} to="/">HomePage</Dropdown.Item>
            <Dropdown.Item id='drop-item' as={Link} to="/packages">About Us</Dropdown.Item>
            <Dropdown.Item id='drop-item' as={Link} to="/login">Login</Dropdown.Item>
        </DropdownButton>
      </div> */}


    export default withRouter(Header)
    







  
     
       
    
          
          
           
          
           
    

    