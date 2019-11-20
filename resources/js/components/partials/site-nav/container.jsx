import React, { Component } from 'react'
import { connect } from 'react-redux';

import View from './view'

class Container extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <View user={this.props.Authentication.user}/>
    }

}

export default connect(({ Authentication }) => ({ Authentication }))(Container)