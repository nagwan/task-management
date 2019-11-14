import React from 'react'
import { useTranslation } from "react-i18next";

const Activity = (({ activity }) => {
    
    const { t } = useTranslation()

    return (
        <div className='py-4 px-4 text-sm'>
            {
                activity.type == 'project_created' ? activity.user.name + ' ' +  t('phrases:project_created')
                    :
                    activity.type == 'task_created' ? activity.user.name + ' ' +  t('phrases:task_created')  + ' ' +  activity.subject.body
                        :
                        activity.type == 'task_completed' ? activity.user.name + ' ' +  t('phrases:task_completed')  + ' ' +  activity.subject.body
                            :
                            activity.type == 'task_incomplete' ? activity.user.name + ' ' +  t('phrases:task_incomplete')  + ' ' +  activity.subject.body
                                :
                                activity.type == 'project_updated' ?activity.user.name + ' ' +  t('phrases:project_updated')
                                    :
                                    activity.type == 'task_updated' ? activity.user.name + ' ' +  t('phrases:task_updated')  + ' ' + activity.subject.body
                                        :
                                        ''
            }
        </div>

    )

})
export default Activity;