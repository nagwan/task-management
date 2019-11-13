import React, { Component } from 'react'
import View from "./view";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import { activeProjectFetchFlag, deleteProjectFlag } from '../../../store/modules/projects/actions'


class Container extends Component {

    constructor(props) {
        super(props);

        this.deleteProject = this.deleteProject.bind(this);
    }


    componentDidMount() {
        const { history, match } = this.props;

        this.props.activeProjectFetchFlag({ id: match.params.id, history });
    }

    deleteProject(data) {

        const { history } = this.props;

        this.props.deleteProjectFlag({ id: data, history })
    }

    render() {
        return <View project={this.props.projects.project} deleteProject={this.deleteProject} />
    }
}

export default withRouter(connect(({ projects }) => ({ projects }),
    dispatch => bindActionCreators({ activeProjectFetchFlag, deleteProjectFlag }, dispatch))(Container))