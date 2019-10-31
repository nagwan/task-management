import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Routes from './routes';
import { connect } from 'react-redux';
import NotFound from '../components/pages/404';
import Navbar from '../components/partials/nav'

const PrivateRoutes = connect(({ Authentication }) => ({ Authentication }))((route) => {
    return (

        route.Authentication.is_auth ? <Route path={route.path} exact={route.exact} component={route.component} /> :

            <Redirect push to='/login' />
    )
})

const AuthRoutes = connect(({ Authentication }) => ({ Authentication }))((route) => {

    return (

        route.Authentication.is_auth && route.Authentication.user.id ? <Redirect push to={`/me/${route.Authentication.user.id}`} /> :

            <Route path={route.path} exact={route.exact} component={route.component} />
    )
})


const ManiRouter = (() => {
    return (

        <div>
            <BrowserRouter>
                <Navbar />
                <div className='container border-solid border-info-500 border-4'>
                    <Switch>
                        {
                            Routes.map((route, index) => (
                                route.private ? <PrivateRoutes key={index} {...route} /> :
                                    (route.auth ? <AuthRoutes key={index} {...route} /> :
                                        <Route key={index} path={route.path} exact={route.exact} component={route.component} />)
                            ))
                        }

                        <Route component={NotFound} />
                    </Switch>

                </div>

            </BrowserRouter>
        </div>
    )
})

export default ManiRouter
