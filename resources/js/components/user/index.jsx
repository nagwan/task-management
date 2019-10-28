import React from 'react'
import { Link } from 'react-router-dom';


const User = (()=>{
    return (
        <div>
            <h1>USER PROFILE</h1>

            <Link to='/new-project'>New Project</Link>
            <Link to='/projects'>My Projects</Link>

        </div>
    )
})

export default User