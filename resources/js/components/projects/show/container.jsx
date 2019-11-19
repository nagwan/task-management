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
        this.fetchProject = this.fetchProject.bind(this);
    }


    componentDidMount() {
        this.interval = setInterval(() => { 
            this.fetchProject()
        }, 3000)
    }

    fetchProject() {
        const { history, match } = this.props;

        this.props.activeProjectFetchFlag({ id: match.params.id, history, location });
    }

   
    componentWillUnmount() {
        clearInterval(this.interval);
    }


    deleteProject(data) {

        const { history } = this.props;

        this.props.deleteProjectFlag({ id: data, history })
    }

    render() {
        return (
            <React.Fragment>
                {
                    !_.isEmpty(this.props.projects.project) ? <View user={this.props.Authentication.user} project={this.props.projects.project} deleteProject={this.deleteProject} /> : null
                }
            </React.Fragment>
        )
    }
}

export default withRouter(connect(({ projects, Authentication }) => ({ projects, Authentication }),
    dispatch => bindActionCreators({ activeProjectFetchFlag, deleteProjectFlag }, dispatch))(Container))