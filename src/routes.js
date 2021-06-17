import {Switch, Route} from 'react-router-dom'
import Landing from './components/landingPage/Landing'
import Studentlogin from './components/studentLogin/Studentlogin'
import Dashboard from './components/dashboard/Dashboard'
import Tutorlogin from './components/tutorLogin/Tutorlogin'


export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/studentlogin' component={Studentlogin} />
        <Route path = '/dashboard' component={Dashboard} />
        <Route path = '/tutorlogin' component={Tutorlogin} />
    </Switch>
)
