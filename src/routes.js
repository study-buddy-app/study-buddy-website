import {Switch, Route} from 'react-router-dom'
import Landing from './components/landingPage/Landing'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import Virtualroom from './components/virtualRooms/Virtualroom'



export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/login' component={Login} />
        <Route path = '/dashboard' component={Dashboard} />
        <Route path = '/virtualroom' component={Virtualroom} />
       
    </Switch>
)
