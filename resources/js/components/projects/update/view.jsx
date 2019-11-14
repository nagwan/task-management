import React from 'react'
import ProjectForm from "../../partials/project-form"


const View = (({project, submit}) =>{

    return (
        <ProjectForm project={project} submit={submit}/>
    )

})

export default View;