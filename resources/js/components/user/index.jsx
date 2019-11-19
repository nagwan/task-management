import React from 'react'
import { connect } from 'react-redux';


const User = connect(({ Authentication }) => ({ Authentication }))((props) => {
    return (
        <div>
            <h1>USER PROFILE</h1>
        </div>
    )
})

export default User