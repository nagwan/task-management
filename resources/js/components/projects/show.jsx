import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Store from './tasks/store';


const Show = connect(({ projects }) => ({ projects }))((props) => {
    const { t } = useTranslation();

    const data = props.projects.project.tasks;

    return (
        <div className='w-full flex justify-between'>
            <div className='w-8/12'>
                <div className='w-full flex justify-between'>

                    {/* project`s tasks */}
                    <div className='w-8/12'>
                        <p className='text-gray-500 text-lg mx-24 -mb-16'>{t('phrases:tasks_label')}</p>
                        {
                            data && data.length ? data.map(task =>

                                <div className='card border-l-4 border-primary-900' key={task.id}>
                                    <span className='px-20'>{task.body}</span>
                                </div>

                            ) : ''
                        }

                        <Store/>

                    </div>

                    {/* projects` card */}
                    <div className='w-4/12 h-240 card hover:shadow-lg'>
                        <div className='w-full h-60 py-20 px-20 border-l-4 border-primary-900'>
                            <p className='text-primary-900 font-semibold font-harmattan'>{props.projects.project.title}</p>
                        </div>
                        <div className='w-full py-20 px-20'>
                            <p className='text-gray-700 font-medium font-tajawal-medium italic'>{props.projects.project.description.substring(0, 100) + " ... "}</p>
                        </div>
                    </div>
                </div>

                <div className='mt-80 w-8/12'>
                    <p className='text-gray-500 text-lg mx-24 -mb-16'>{t('phrases:general_notes_label')}</p>
                    <textarea className='card h-240 w-full px-12'></textarea>
                </div>
            </div>

            {/* recent project`s updates */}
            <div className='w-4/12'>
                <div></div>
            </div>

            <Link to='/projects'>{t('phrases:go_back_btn')}</Link>
        </div>
    )
})

export default Show