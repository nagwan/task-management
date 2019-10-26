import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from '../store/index';
import Routes from '../router'
import '../../lang/index'
import '../../sass/app.sass' 

render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
