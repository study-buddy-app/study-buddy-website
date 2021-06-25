import {Switch, Route} from 'react-router-dom'
import Landing from './components/landingPage/Landing'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import Virtualroom from './components/virtualRooms/Virtualroom'
import Registration from './components/studentAuth/Registration'
import Aboutus from './components/aboutus/Aboutus'
import Buddy from './components/buddy_finder/buddy_finder'
import Qbot from './components/qbot/Qbot'
import buddy_finder from './components/buddy_finder/buddy_finder'


export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/login' component={Login} />
        <Route path = '/registration' component={Registration} />
        <Route path = '/dashboard' component={Dashboard} />
        <Route path = '/virtualroom' component={Virtualroom} />   
        <Route path = '/aboutus' component={Aboutus} />   
        <Route path = '/meetup' component={buddy_finder} />
        <Route path = '/qbot' component={Qbot} />

    </Switch>
)
