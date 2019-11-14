import React from 'react'
import { useTranslation } from "react-i18next";


const ProjectUpdated = (({ activity }) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <span>{activity.user.name}</span> <span>{t('phrases:project_updated')}</span>
        </React.Fragment>
    )
})

export default ProjectUpdated