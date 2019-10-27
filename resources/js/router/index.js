import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Routes from './routes';
import { connect } from 'react-redux';


const PrivateRoutes = connect(({ Authentication }) => ({ Authentication }))((route) => {
    return (

        route.Authentication.is_auth ? <Route path={route.path} exact={route.exact} component={route.component} /> :

            <Redirect to='/login' />
    )
})

const AuthRoutes = connect(({ Authentication }) => ({ Authentication }))((route) => {
    
    return (

        route.Authentication.is_auth ? <Redirect to= {`/me/${route.Authentication.user.id}`} /> :

            <Route path={route.path} exact={route.exact} component={route.component} />
    )
})


const ManiRouter = (() => {
    return (

        <div>
            <BrowserRouter>
                <Switch>
                    {
                        Routes.map((route, index) => (
                            route.private ? <PrivateRoutes key={index} {...route} /> :
                                (route.auth ? <AuthRoutes key={index} {...route} /> : <Redirect key={index} to='/not-found' />)
                        ))
                    }
                </Switch>
            </BrowserRouter>
        </div>
    )
})

export default ManiRouter
