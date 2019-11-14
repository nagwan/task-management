import React from 'react'

const ActivityTime = (({val}) => {
    
    return (
        <span className='font-harmattan font-sx italic text-gray-500 float-right'>{window.moment(val, ["YYYY-MM-DDTHH:mm:ss"]).fromNow()}</span>
    )
})

export default ActivityTime