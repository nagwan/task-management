import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import Store from '../tasks/store/index';
import Task from '../tasks/index';
import Activity from '../../partials/activity';
import InviteUsers from '../invite-users'

const View = (({ user, project, deleteProject, deleteMember }) => {

    const { t } = useTranslation();

    const tasks = project.tasks;

    return (
        <div className='w-full'>
            <div className='w-full flex justify-between items-center p-24 '>

                {
                    user.id == project.owner_id && project.members.length ?

                        project.members.length ?
                            <div className='flex'>
                                {
                                    project.members.map(member =>
                                        <img onClick={()=> deleteMember({id:member.id})} title={member.name} alt={member.name} key={member.id} src={member.profile.avatar} className='cursor-pointer rounded-full border-primary-900 border-rounded border-4 mr-4' width='50px' height='50px' />
                                    )
                                }
                            </div>
                            : ''
                        : <img title={project.owner.name} alt={project.owner.name} src={project.owner.profile.avatar} className='rounded-full border-primary-900 border-rounded border-4' width='50px' height='50px' />

                }

                <Link to='/projects'>
                    <i className="fas fa-layer-group mx-8"></i>
                    <span>
                        {t('phrases:go_back_btn')}
                    </span>
                </Link>

            </div>

            <div className='w-full flex justify-between '>
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

                        <div className='w-5/12'>
                            {/* projects` card */}
                            <div className='w-full'>
                                <div className='min-h-240 card py-20 hover:shadow-lg'>
                                    <div className='w-full min-h-60 py-20 px-20 border-l-4 border-primary-900 flex align-center justify-between'>
                                        <p className='text-primary-900 font-semibold'>{project.title}</p>
                                        <Link to={`/edit-project/${project.id}`} className="fas fa-edit text-primary-900 hover:text-primary-500"></Link>
                                    </div>
                                    <div className='w-full flex flex-1 py-20 px-20'>
                                        <p className='text-gray-700 font-medium italic'>{project.description}</p>
                                    </div>
                                    {
                                        user.id == project.owner_id ?
                                            <div className='w-full pt-20 px-20 flex justify-end'>
                                                <button onClick={() => deleteProject(project.id)}>
                                                    <i className="fas fa-trash-alt text-primary-900 hover:text-danger-500"></i>
                                                </button>
                                            </div>
                                            : ''
                                    }

                                </div>
                            </div>

                            {/* invite users card */}

                            {
                                user.id == project.owner_id ? <InviteUsers /> : ''
                            }

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
            </div >
        </div>

    )
})

export default View