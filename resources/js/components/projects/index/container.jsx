import React, { Component } from 'react'
import { connect } from 'react-redux';
import View from './view';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import { projectsIndexFlag } from '../../../store/modules/projects/actions'

class Container extends Component {

    componentDidMount() {
        const { history } = this.props;
        this.props.projectsIndexFlag({history})
    }

    render() {

        return <View data={this.props.projects.projects} />
    }

}

export default withRouter(connect(({ projects }) => ({ projects }),
    dispatch => bindActionCreators({ projectsIndexFlag }, dispatch))(Container))