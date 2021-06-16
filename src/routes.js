import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing'
import Studentauth from './components/Studentauth' 

export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/Studentauth' component={Studentauth} />
    </Switch>
)
