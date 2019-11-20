import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginFlag } from '../../../store/modules/authentication/actions'
import View from './view';


class Container extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(data) {
        this.props.loginFlag(data)
    }

    render() {
        return <View login={this.login} />
    }

}

export default connect(null, dispatch => bindActionCreators({ loginFlag }, dispatch))(Container)
