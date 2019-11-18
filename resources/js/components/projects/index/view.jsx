import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';


const View = (({ data }) => {

    const { t } = useTranslation();

    return (
        <div className='w-full flex flex-wrap'>

            {
                data.length ?
                    data.map(project =>
                        <Link to={`/projects/${project.id}`} className='w-3/12 h-240 card py-20 hover:shadow-lg cursor-pointer' key={project.id}>
                            <div className='w-full h-60 py-20 px-20 border-l-4 border-primary-900'>
                                <p className='text-primary-900 font-semibold'>{project.title.substring(0, 25) + " ... "}</p>
                            </div>
                            <div className='w-full py-20 px-20'>
                                <p className='text-gray-700 font-medium italic'>{project.description.substring(0, 100) + " ... "}</p>
                            </div>
                        </Link>
                    ) :
                    <p>{t('phrases:no_projects_yet')}</p>
            }

        </div>
    )
})

export default View