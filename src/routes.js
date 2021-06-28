import {Switch, Route} from 'react-router-dom'
import Landing from './components/landingPage/Landing'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/dashboard/Profile'
import Tutorprofile from './components/tutorDash/Tutorprofile'
import SocketApp from './components/virtualRooms/SocketApp'
import SocketApp from '../src/components/VirtualRooms/SocketApp';
import Registration from './components/studentAuth/Registration'
import Aboutus from './components/aboutus/Aboutus'
import Tutordash from './components/tutorDash/Tutordash'
import Buddy from './components/buddy_finder/buddy_finder'
import StripeContainer from './components/stripe/StripeContainer'

export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/login' component={Login} />
        <Route path = '/registration' component={Registration} />
        <Route path = '/dashboard' component={Dashboard} />
        <Route path = '/virtualrooms' component={SocketApp} />       
        <Route path = '/aboutus' component={Aboutus} />   
        <Route path = '/tutordash' component={Tutordash} />
        <Route path = '/buddyup' component={Buddy} />
        <Route path= '/stripe' component={StripeContainer}/>
        <Route path= '/profile' component={Profile}/>
        <Route path= '/tutorprofile' component={Tutorprofile}/>

    </Switch>
)
