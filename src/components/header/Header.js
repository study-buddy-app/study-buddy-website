import {Link, withRouter} from 'react-router-dom'
import '../header/Header.scss'

const Header = () => {
    return (
    <header>     
      <div className='H-secLeft'>
        <img className='logo' height='80%' width='20%' src='https://study-buddy-bucket.s3.us-east-2.amazonaws.com/Study+Buddy+logo+resize.png' alt='Study Buddy logo'/>
      </div>
      <div>
        <input className='searchBar' placeholder='Search'/>
      </div>

      <div className='H-secRight'>
        <Link className='links-home' to='/'><h1>HomePage</h1></Link>
        <Link className='links' to='/login'><h1>Login</h1></Link>
        <Link className='links'><h1>About Us</h1></Link>
      </div>
  </header>
  )

}

    export default withRouter(Header)
    

    