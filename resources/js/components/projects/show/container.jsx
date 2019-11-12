import React, { Component } from 'react'
import View from "./view";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import { activeProjectFetchFlag } from '../../../store/modules/projects/actions'


class Container extends Component {

    componentDidMount() {
        const { history, match } = this.props;
        this.props.activeProjectFetchFlag({ id: match.params.id, history });
    }

    render() {
        return <View project={this.props.projects.project}/>
    }
}

export default withRouter(connect(({ projects }) => ({ projects }),
    dispatch => bindActionCreators({ activeProjectFetchFlag }, dispatch))(Container))