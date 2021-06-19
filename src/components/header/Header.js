import {Link, withRouter} from 'react-router-dom'
import '../header/Header.css'


const Header = () => {
    return (
    <header>
            <Link to='/'><h1>HomePage</h1></Link>
            <Link to='/Studentauth'><h1>Login</h1></Link>
            <Link to='/Registration'><h1>Register</h1></Link>
  </header>)
}

    export default withRouter(Header)