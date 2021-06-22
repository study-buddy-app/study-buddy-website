import {Link, withRouter} from 'react-router-dom'
import '../header/Header.scss'
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
      
        
       
      </div>
  </header>
  )

}

    export default withRouter(Header)
    

    