import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import Wallet from './pages/Wallet'
import Quote from './pages/Quote'
import Buy from './pages/Buy'
import Sell from './pages/Sell'
import History from './pages/History'

import AuthRoute from './utils/AuthRoute'
import NotAuthRoute from './utils/NotAuthRoute'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                
                <NotAuthRoute path="/login" component={Login} />
                <NotAuthRoute path="/register" component={Register} />
                <NotAuthRoute path="/forget-password" component={ForgetPassword} />

                <AuthRoute path="/wallet" component={Wallet} />
                <AuthRoute path="/quote" component={Quote} />
                <AuthRoute path="/buy" component={Buy} />
                <AuthRoute path="/sell" component={Sell} />
                <AuthRoute path="/history" component={History} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes