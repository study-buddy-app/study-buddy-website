import {Link, withRouter} from 'react-router-dom'
import '../header/Header.scss'


const Header = () => {
    return (
    <header>
            <Link className='link1' to='/'><h1>HomePage</h1></Link>
            <Link className='link2' to='/login'><h1>Login</h1></Link>
           
  </header>)
}

    export default withRouter(Header)
    

    