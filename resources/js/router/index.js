import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Routes from './routes';


const PrivateRoutes = ((route) => {
    return (
        <Route path={route.path} exact={route.exact} component={route.component} />
    )
})

const AuthRoutes = ((route) => {
    return (
        <Route path={route.path} exact={route.exact} component={route.component} />
    )
})


const ManiRouter = (() => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    {
                        Routes.map((route, i) => (
                            route.private ? <PrivateRoutes key={i} {...route} /> :
                                (route.auth ? <AuthRoutes key={i} {...route} /> : <Redirect to='/not-found' />)
                        ))
                    }
                </Switch>
            </BrowserRouter>
        </div>
    )
})

export default ManiRouter
