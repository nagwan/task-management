import React from 'react'
import { useTranslation } from "react-i18next";


const TaskCompleted = (({ activity }) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <span className='italic'>{activity.user.name}</span> <span>{t('phrases:task_completed')}</span> <span className='line-through text-gray-500 italic'>{activity.subject.body}</span> 🎉 <span className='font-harmattan font-sx italic text-gray-500'>{window.moment(activity.created_at, ["YYYY-MM-DDTHH:mm:ss"]).fromNow()}</span>
        </React.Fragment>
    )
})

export default TaskCompleted