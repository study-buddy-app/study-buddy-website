import {Switch, Route} from 'react-router-dom'
import Landing from './components/landingPage/Landing'
import Studentlogin from './components/studentLogin/Studentlogin'
import Dashboard from './components/dashboard/Dashboard'
import Tutorlogin from './components/tutorLogin/Tutorlogin'
import Registration from './components/studentAuth/Registration'

export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/studentlogin' component={Studentlogin} />
        <Route path = '/registration' component={Registration} />
        <Route path = '/dashboard' component={Dashboard} />
        <Route path = '/tutorlogin' component={Tutorlogin} />
    </Switch>
)
