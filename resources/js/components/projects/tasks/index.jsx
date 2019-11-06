import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from "react-i18next";
import { updateTaskFlag } from '../../../store/modules/projects/actions'


const Task = connect(null, dispatch => bindActionCreators({ updateTaskFlag }, dispatch))((props) => {

    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        body: Yup
            .string()
            .min(3, t('phrases:min_error_msg'))
            .max(50, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg')),
    })

    return (
        <div className='card py-12'>
            <div className={'w-full px-12' + (props.task.completed ? ' border-l-4 border-gray-500' : ' border-l-4 border-primary-900')}>


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
                    {({ errors, handleSubmit }) => (
                        <Form className='flex justify-between items-center h-40' onSubmit={handleSubmit}>

                            <Field className={'w-10/12 h-full px-8 py-8 focus:outline-none focus:shadow-outline' + (errors.body ? ' border border-solid border-1 border-danger-500 font-normal text-danger-500' : '') + (props.task.completed ? ' line-through text-gray-500' : 'no-underline text-primary-900')}
                                placeholder={t('phrases:task_body_input_placeholder')} type="text" name="body" />

                            {errors.body ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="body" component="div" />) : null}

                            <Field className='w-2/12' type="checkbox"
                                render={() => {
                                    return (
                                        <label className='checkbox-container mt-8 p-20'>
                                            <input name="completed" type="checkbox" defaultChecked={props.task.completed} onChange={(e) => props.updateTaskFlag({ values: { body: props.task.body, completed: e.target.checked }, id: props.task.id })} />
                                            <span className="checkmark"></span>
                                        </label>
                                    );
                                }}
                            />
                        </Form>
                    )
                    }

                </Formik >
            </div>
        </div >

    )
})

export default Task
