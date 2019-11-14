import React from 'react'
import { useTranslation } from "react-i18next";


const ProjectCreated = (({activity}) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <span>{activity.user.name}</span> <span>{t('phrases:project_created')}</span>
        </React.Fragment>
    )
})

export default ProjectCreated