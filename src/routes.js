import {Switch, Route} from 'react-router-dom'
import Landing from './components/landingPage/Landing'
import Studentauth from './components/studentAuth/Studentauth' 

export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/Studentauth' component={Studentauth} />
    </Switch>
)
