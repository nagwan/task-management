import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Store from './tasks/store';
import Task from './tasks';


const Show = connect(({ projects }) => ({ projects }))((props) => {
    const { t } = useTranslation();

    const tasks = props.projects.project.tasks;

    return (
        <div className='w-full flex justify-between'>
            <div className='w-10/12'>
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
                            <div className='w-full min-h-60 py-20 px-20 border-l-4 border-primary-900'>
                                <p className='text-primary-900 font-semibold'>{props.projects.project.title}</p>
                            </div>
                            <div className='w-full py-20 px-20'>
                                <p className='text-gray-700 font-medium italic'>{props.projects.project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-80 w-8/12'>
                    <p className='text-gray-500 text-lg mx-24 -mb-16'>{t('phrases:general_notes_label')}</p>
                    <textarea className='card h-240 py-20 w-full px-12'></textarea>
                </div>
            </div>

            {/* recent project`s updates */}
            <div className='w-2/12'>
                <div></div>
            </div>

            <Link to='/projects'>{t('phrases:go_back_btn')}</Link>
        </div>
    )
})

export default Show