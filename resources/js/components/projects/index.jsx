import React from 'react'
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import { bindActionCreators } from 'redux';
import { useHistory } from "react-router-dom";
import { projectShowFlag } from "../../store/modules/projects/actions";

const Index = connect(({ projects }) => ({ projects }),
    dispatch => bindActionCreators({ projectShowFlag }, dispatch))((props) => {

        const { t } = useTranslation();
        const history = useHistory()
        let data = props.projects.projects

        return (
            <div className='w-full flex flex-wrap justify-center'>

                {
                    data.length ?
                        data.map(project =>
                            <div onClick={() => props.projectShowFlag({ id: project.id, history: history })} className='w-3/12 h-240 card hover:shadow-lg cursor-pointer' key={project.id}>
                                <div className='w-full h-60 py-20 px-20 border-l-4 border-primary-900'>
                                    <p className='text-primary-900 font-semibold font-harmattan'>{project.title}</p>
                                </div>
                                <div className='w-full py-20 px-20'>
                                    <p className='text-gray-700 font-medium font-tajawal-medium italic'>{project.description.substring(0, 100) + " ... "}</p>
                                </div>
                            </div>
                        ) :
                        <p>No Projects Yet</p>
                }


            </div>

        )
    })

export default Index