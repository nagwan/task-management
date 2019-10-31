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
            <div className='container py-112 px-12'>
                <p>{t('phrases:projects_title')}</p>
                <ul className='list-disc'>
                    {
                        data.length ?
                            data.map(project =>
                                <li className='cursor-pointer' key={project.id}>
                                    <p onClick={() => props.projectShowFlag({ id: project.id, history: history })}>{project.title}</p>
                                </li>
                            ) :
                            <li>No Projects Yet</li>
                    }
                </ul>
            </div>
        )
    })

export default Index