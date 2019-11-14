import React from 'react'
import ProjectCreated from './project-created';
import ProjectUpdated from './project-updated';
import TaskCompleted from './task-completed';
import TaskCreated from './task-created';
import TaskIncomplete from './task-incomplete';
import TaskUpdated from './task-updated';

const Activity = (({ activity }) => {

    return (
        <div className='py-4 px-4 text-sm'>
            {
                activity.type == 'project_created' ? <ProjectCreated activity={activity}/>
                    :
                    activity.type == 'task_created' ? <TaskCreated activity={activity}/>
                        :
                        activity.type == 'task_completed' ? <TaskCompleted activity={activity}/>
                            :
                            activity.type == 'task_incomplete' ? <TaskIncomplete activity={activity}/>
                                :
                                activity.type == 'project_updated' ? <ProjectUpdated activity={activity}/>
                                    :
                                    activity.type == 'task_updated' ? <TaskUpdated activity={activity}/>
                                        :
                                        ''
            }
        </div>

    )

})
export default Activity;