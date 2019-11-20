import React from 'react'
import { useTranslation } from "react-i18next";
import UserName from './user-name';
import ActivityTime from './activity-time';


const TaskDeleted = (({ activity }) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <UserName name={activity.user ?  activity.user.name : '👻'}/> <span>{t('phrases:task_deleted')}</span> <span className='text-danger-700 italic'>{activity.changes.before.body}</span> 🥴 <ActivityTime val={activity.created_at}/>
        </React.Fragment>

    )
})

export default TaskDeleted