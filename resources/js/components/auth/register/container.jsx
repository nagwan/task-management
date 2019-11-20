import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registrationFlag } from '../../../store/modules/authentication/actions'
import View from './view';


class Container extends Component {
    constructor(props) {
        super(props);

        this.register = this.register.bind(this);
    }

    register(data) {
        this.props.registrationFlag(data)
    }

    render() {
        return <View register={this.register} />
    }

}

export default connect(null, dispatch => bindActionCreators({ registrationFlag }, dispatch))(Container)
