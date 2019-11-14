import React from 'react'
import { useTranslation } from "react-i18next";


const TaskIncomplete = (({ activity }) => {

    const { t } = useTranslation() 

    return (
        <React.Fragment>
            <span>{activity.user.name}</span> <span>{t('phrases:task_incomplete')}</span> <span>{activity.subject.body}</span>
        </React.Fragment>
    )
})

export default TaskIncomplete