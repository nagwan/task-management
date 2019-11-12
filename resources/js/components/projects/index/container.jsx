import React, { Component } from 'react'
import { connect } from 'react-redux';
import View from './view';
import { bindActionCreators } from 'redux';

import { projectsIndexFlag } from '../../../store/modules/projects/actions'

class Container extends Component {

    componentDidMount() {
        this.props.projectsIndexFlag()
    }

    render() {

        return <View data={this.props.projects.projects} />
    }

}

export default connect(({ projects }) => ({ projects }),
    dispatch => bindActionCreators({ projectsIndexFlag }, dispatch))(Container)