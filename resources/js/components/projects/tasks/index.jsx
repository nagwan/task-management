import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from "react-i18next";
import { updateTaskFlag } from '../../../store/modules/projects/actions'


const Task = connect(null, dispatch => bindActionCreators({ updateTaskFlag }, dispatch))((props) => {

    console.log(props.task, 'props')

    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        body: Yup
            .string()
            .min(3, t('phrases:min_error_msg'))
            .max(50, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg')),
    })


    return (
        <div className='card'>
            <Formik initialValues={
                {
                    body: props.task.body,
                    completed: props.task.completed
                }
            }
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    props.updateTaskFlag({ values, id: props.task.id })
                    resetForm()
                    setSubmitting(false)
                }

                }

            >
                {({ errors, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>

                        <Field className={'shadow appearance-none border rounded w-full h-40 px-8 py-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' + (errors.body ? 'border-solid border-1 border-danger-500' : '')}
                            placeholder={t('phrases:task_body_input_placeholder')} type="text" name="body" />

                        {errors.body ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="body" component="div" />) : null}

                        <Field type="checkbox" defaultChecked={props.task.completed} name="completed" />

                        <div className="my-28 mx-12 flex justify-between items-center">
                            <button className={'bg-primary-900 hover:bg-transparent text-white hover:text-primary-900 border border-transparent hover:border hover:border-primary-900 font-bold py-8 px-8 rounded rounded-8' + (isSubmitting || errors.body ? ' opacity-50 cursor-not-allowed' : '')} type="submit" disabled={isSubmitting || errors.body} type="submit">
                                {t('phrases:update_task_btn')}
                            </button>
                        </div>
                    </Form>
                )
                }

            </Formik >
        </div>

    )
})

export default Task
