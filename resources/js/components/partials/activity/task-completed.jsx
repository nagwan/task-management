import React from 'react'
import { useTranslation } from "react-i18next";
import UserName from './user-name';
import ActivityTime from './activity-time';


const TaskCompleted = (({ activity }) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <UserName name={activity.user.name} /> <span>{t('phrases:task_completed')}</span> <span className='line-through text-gray-500 italic'>{activity.changes.before.body}</span> 🎉 <ActivityTime val={activity.created_at} />
        </React.Fragment>
    )
})

export default TaskCompleted