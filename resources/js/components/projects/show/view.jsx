import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import Store from '../tasks/store';
import Task from '../tasks';
import Activity from '../../partials/activity';


const View = (({ project, deleteProject }) => {

    const { t } = useTranslation();

    const tasks = project.tasks;

    return (
        <div className='w-full flex justify-between'>
            <div className='w-9/12'>
                <div className='w-full flex justify-between'>

                    {/* project`s tasks */}
                    <div className='w-7/12'>
                        <p className='text-gray-500 text-lg mx-24 -mb-16'>{t('phrases:tasks_label')}</p>
                        {
                            tasks && tasks.length ? tasks.map(task =>
                                <Task key={task.id} task={task} />

                            ) : ''
                        }
                        <Store />
                    </div>

                    {/* projects` card */}
                    <div className='w-5/12'>
                        <div className='min-h-240 card py-20 hover:shadow-lg'>
                            <div className='w-full min-h-60 py-20 px-20 border-l-4 border-primary-900 flex align-center justify-between'>
                                <p className='text-primary-900 font-semibold'>{project.title}</p>
                                <Link to={`/edit-project/${project.id}`} className="fas fa-edit"></Link>
                            </div>
                            <div className='w-full py-20 px-20'>
                                <p className='text-gray-700 font-medium italic'>{project.description}</p>
                            </div>
                            <button onClick={() => deleteProject(project.id)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* recent project`s updates */}
            {
                project.activity ?
                    <div className='w-3/12'>
                        <div className='card py-20 px-20'>
                            {
                                project.activity.map(activity =>
                                    <Activity activity={activity} key={activity.id} />
                                )
                            }

                        </div>
                    </div>
                    : ''
            }


            <Link to='/projects'>{t('phrases:go_back_btn')}</Link>
        </div >
    )
})

export default View