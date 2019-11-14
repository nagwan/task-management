import React from 'react'
import { useTranslation } from "react-i18next";


const ProjectUpdated = (({ activity }) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <span className='italic'>{activity.user.name}</span> <span>{t('phrases:project_updated')}</span> 😌 <span className='font-harmattan font-sx italic text-gray-500'>{window.moment(activity.created_at, ["YYYY-MM-DDTHH:mm:ss"]).fromNow()}</span>
        </React.Fragment>
    )
})

export default ProjectUpdated