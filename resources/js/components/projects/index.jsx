import React from 'react'
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import { bindActionCreators } from 'redux';
import { useHistory } from "react-router-dom";
import { projectShowFlag, projectsIndexFlag} from "../../store/modules/projects/actions";

const Index = connect(({ projects }) => ({ projects }), 
    dispatch => bindActionCreators({ projectShowFlag, projectsIndexFlag }, dispatch))((props) => {

    props.projectsIndexFlag();
    const { t } = useTranslation(); 
    const history = useHistory()

    return (
        <div className='container py-112 px-12'>
            <p>{t('phrases:projects_title')}</p>
            <ul className='list-disc'>
                {
                    props.projects.projects.map(project =>
                        <li className='cursor-pointer' key={project.id}>
                            <p onClick={() => props.projectShowFlag({ id: project.id, history: history })}>{project.title}</p>
                        </li>
                    )
                }
            </ul>
        </div>
    )
})

export default Index