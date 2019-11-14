import React from 'react'
import { useTranslation } from "react-i18next";
import UserName from './user-name';


const TaskCreated = (({ activity }) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <UserName name={activity.user.name}/> <span>{t('phrases:task_created')}</span> 
            <span className='font-bold italic'>{activity.subject.body}</span> 🎯 <span className='font-harmattan font-sx italic text-gray-500'>{window.moment(activity.created_at, ["YYYY-MM-DDTHH:mm:ss"]).fromNow()}</span>
        </React.Fragment>

    )
})

export default TaskCreated