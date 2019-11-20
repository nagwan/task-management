import React from 'react'
import { useTranslation } from "react-i18next";
import UserName from './user-name';
import ActivityTime from './activity-time';


const TaskCreated = (({ activity }) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <UserName name={activity.user ?  activity.user.name : '👻'}/> <span>{t('phrases:task_created')}</span> <span className='font-bold italic'>{activity.changes.after.body}</span> 🎯 <ActivityTime val={activity.created_at}/>
        </React.Fragment>

    )
})

export default TaskCreated