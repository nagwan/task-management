import React, { Component } from 'react'
import { connect } from 'react-redux';

import View from './view'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import { logOutFlag } from '../../../store/modules/authentication/actions'

class Container extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            is_opened: false
        };

        this.state = this.initialState;

        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    toggleMenu() {
        this.setState({
            is_opened: !this.state.is_opened
        });

    }

    closeMenu() {
        this.setState({
            is_opened: false
        });
    }

    logOut() {

        const { history } = this.props;

        this.props.logOutFlag({ history });
    }

    render() {
        return (
            <div className='flex justify-center relative w-2/12'>
                <button onClick={this.toggleMenu} className="z-10">
                    {this.props.Authentication.user.name}
                </button>
                {this.state.is_opened ? (
                    <React.Fragment>
                        <View closeMenu={this.closeMenu} logOut={this.logOut} user={this.props.Authentication.user} />
                        <button onClick={this.closeMenu} className='cursor-auto fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-primary-900 opacity-50'></button>
                    </React.Fragment>
                ) : ''}
            </div>
        )
    }

}

export default withRouter(connect(({ Authentication }) => ({ Authentication }),
    dispatch => bindActionCreators({ logOutFlag }, dispatch))(Container))