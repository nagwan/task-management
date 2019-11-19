import React, { Component } from 'react'
import View from "./view";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import { inviteUsersFlag } from '../../../store/modules/projects/actions'


class Container extends Component {

    constructor(props) {
        super(props);

        this.inviteUser = this.inviteUser.bind(this);
    }


    inviteUser(data) {

        const { match } = this.props;

        this.props.inviteUsersFlag({ id: match.params.id, data })
    }

    render() {
        return (
            <React.Fragment>

                <View  inviteUser={this.inviteUser} />

            </React.Fragment>
        )
    }
}

export default withRouter(connect(({ projects }) => ({ projects }),
    dispatch => bindActionCreators({ inviteUsersFlag }, dispatch))(Container))