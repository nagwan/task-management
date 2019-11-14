import React, { Component } from 'react'
import View from "./view";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { projectStoreFlag } from '../../../store/modules/projects/actions'


class Container extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {

        const { history } = this.props;

        this.props.projectStoreFlag({ values: data, history })
    }

    render() {

        return <View submit={this.handleSubmit} />

    }

}

export default withRouter(connect(null,
    dispatch => bindActionCreators({ projectStoreFlag }, dispatch))(Container))

