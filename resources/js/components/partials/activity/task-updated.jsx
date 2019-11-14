import React from 'react'
import { useTranslation } from "react-i18next";


const TaskUpdated = (({ activity }) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <span>{activity.user.name}</span> <span>{t('phrases:task_updated')}</span> <span>{activity.subject.body}</span> <span>{window.moment(activity.created_at, ["YYYY-MM-DDTHH:mm:ss"]).fromNow()}</span>
        </React.Fragment>
    )
})

export default TaskUpdated