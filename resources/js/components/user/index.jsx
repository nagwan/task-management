import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { projectsIndexFlag} from "../../store/modules/projects/actions";


const User = connect(null, dispatch => bindActionCreators({ projectsIndexFlag }, dispatch))((props)=>{
    return (
        <div>
            <h1>USER PROFILE</h1>

            <Link to='/new-project'>New Project</Link>
            <Link onClick={props.projectsIndexFlag} to='/projects'>My Projects</Link>

        </div>
    )
})

export default User