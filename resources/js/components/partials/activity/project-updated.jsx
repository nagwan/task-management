import React from 'react'
import { useTranslation } from "react-i18next";
import UserName from './user-name';
import ActivityTime from './activity-time';


const ProjectUpdated = (({ activity }) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <UserName name={activity.user.name}/> <span>{t('phrases:project_updated')}</span> 😌 
            <ActivityTime val={activity.created_at}/>
        </React.Fragment>
    )
})

export default ProjectUpdated