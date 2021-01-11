import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import Wallet from './pages/Wallet'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/forget-password" component={ForgetPassword} />
                <Route path="/wallet" component={Wallet} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes