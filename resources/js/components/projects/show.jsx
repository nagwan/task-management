import React from 'react'
import { connect } from 'react-redux';


const Show = connect(({projects}) => ({projects}))((props) => {
    return (
        <div>
            <h1>{props.projects.project.title}</h1>
            <h3>{props.projects.project.description}</h3>
        </div>
    )
})

export default Show