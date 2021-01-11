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

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/forget-password" component={ForgetPassword} />
                <Route path="/wallet" component={Wallet} />
                <Route path="/quote" component={Quote} />
                <Route path="/buy" component={Buy} />
                <Route path="/sell" component={Sell} />
                <Route path="/history" component={History} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes