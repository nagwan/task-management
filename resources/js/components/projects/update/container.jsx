import React, { Component } from 'react'
import View from "./view";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { activeProjectFetchFlag, projectUpdateFlag } from '../../../store/modules/projects/actions'


class Container extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        const { history, match } = this.props;

        this.props.activeProjectFetchFlag({ id: match.params.id, history });
    }

    handleSubmit(data) {

        const { history, match } = this.props;

        this.props.projectUpdateFlag({ id: match.params.id, values: data, history })
    }

    render() {
        return (
            <React.Fragment>
                {
                    !_.isEmpty(this.props.projects.project) ? <View project={this.props.projects.project} submit={this.handleSubmit} /> : null
                }
            </React.Fragment>
        )
    }

}

export default withRouter(connect(({ projects }) => ({ projects }),
    dispatch => bindActionCreators({ activeProjectFetchFlag, projectUpdateFlag }, dispatch))(Container))

