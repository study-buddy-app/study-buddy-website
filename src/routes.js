import {Switch, Route} from 'react-router-dom'
import Landing from './components/landingPage/Landing'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import SocketApp from './components/VirtualRooms/SocketApp'
import Registration from './components/studentAuth/Registration'


export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/login' component={Login} />
        <Route path = '/Login' component={Login} />
        <Route path = '/registration' component={Registration} />
        <Route path = '/dashboard' component={Dashboard} />
        <Route path = '/virtualrooms' component={SocketApp} />     
    </Switch>
)
