import React from 'react'
import { useTranslation } from "react-i18next";


const TaskIncomplete = (({ activity }) => {

    const { t } = useTranslation() 

    return (
        <React.Fragment>
            <span className='italic'>{activity.user.name}</span> <span>{t('phrases:task_incomplete')}</span> <span className='font-bold italic'>{activity.subject.body}</span> 🤔 <span className='font-harmattan font-sx italic text-gray-500'>{window.moment(activity.created_at, ["YYYY-MM-DDTHH:mm:ss"]).fromNow()}</span>
        </React.Fragment>
    )
})

export default TaskIncomplete