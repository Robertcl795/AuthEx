import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DashboardPage from './dashboard';
import SignUpPage from './signup';
import SignInPage from './signin';
import SignOutPage from './signout';
import HomePage from './home';


const RouterConfig = () => {
    return (
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/signin' component={SignInPage} />
            <Route path='/signout' component={SignOutPage} />
            <Route path='/dashboard' component={DashboardPage} />
        </Switch>
    )
}

export default RouterConfig
