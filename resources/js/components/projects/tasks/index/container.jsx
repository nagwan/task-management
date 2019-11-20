import React, { Component } from 'react'
import View from "./view";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTaskFlag, deleteTaskFlag } from '../../../../store/modules/projects/actions'


class Container extends Component {

    constructor(props) {
        super(props);

        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    updateTask(data){
        this.props.updateTaskFlag(data)
    }

    deleteTask(data){
        this.props.deleteTaskFlag(data)
    }


    render() {

        return <View task={this.props.task} updateTask={this.updateTask} deleteTask={this.deleteTask}/>

    }

}

export default connect(null, dispatch => bindActionCreators({ updateTaskFlag, deleteTaskFlag }, dispatch))(Container)

