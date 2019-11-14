import React from 'react'
import { useTranslation } from "react-i18next";
import UserName from './user-name';
import ActivityTime from './activity-time';


const ProjectUpdated = (({ activity }) => {

    const { t } = useTranslation()

    return (
        <React.Fragment>
            <UserName name={activity.user.name} /> 
            {
                Object.keys(activity.changes.after).length == 2 ?
                    <React.Fragment>
                        <span> {t('phrases:project_updated')}</span> {Object.keys(activity.changes.after)[0]} from <span className='line-through text-gray-500 italic'>{Object.values(activity.changes.before)[0]}</span> to <span className='font-bold italic'>{Object.values(activity.changes.after)[0]}</span>
                    </React.Fragment>
                    : <span> {t('phrases:project_updated')}</span>
            }
            😃
            <ActivityTime val={activity.created_at} />
        </React.Fragment>
    )
})

export default ProjectUpdated