import React, { Component } from 'react'
import View from "./view";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { taskStoreFlag } from '../../../../store/modules/projects/actions'


class Container extends Component {

    constructor(props) {
        super(props);

        this.storeTask = this.storeTask.bind(this)
    }

    storeTask(data) {
        this.props.taskStoreFlag(data)
    }



    render() {

        return <View storeTask={this.storeTask} />

    }

}

export default connect(null, dispatch => bindActionCreators({ taskStoreFlag }, dispatch))(Container)

