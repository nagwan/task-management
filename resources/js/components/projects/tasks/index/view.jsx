import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { useTranslation } from "react-i18next";


const View = (({ task, updateTask, deleteTask }) => {
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
            <div className={'w-full px-12' + (task.completed ? ' border-l-4 border-gray-500' : ' border-l-4 border-primary-900')}>

                <Formik initialValues={
                    {
                        body: task.body,
                        completed: task.completed
                    }
                }
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true)
                        updateTask({ values, id: task.id })
                        resetForm()
                        setSubmitting(false)
                    }
                    }

                >
                    {({ errors, handleSubmit }) => (
                        <Form className='flex justify-between items-center h-40' onSubmit={handleSubmit}>

                            <Field className={'w-10/12 h-full px-8 py-8 focus:outline-none focus:shadow-outline' + (errors.body ? ' border border-solid border-1 border-danger-500 font-normal text-danger-500' : '') + (task.completed ? ' line-through text-gray-500' : 'no-underline text-primary-900')}
                                placeholder={t('phrases:task_body_input_placeholder')} type="text" name="body" />

                            {errors.body ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="body" component="div" />) : null}

                            <div className='flex'>

                                <button type='button' className='mx-8 focus:outline-none' onClick={() => deleteTask({ id: task.id })}>
                                    <i className="fas fa-trash-alt text-xl text-gray-300  hover:text-danger-700"></i>
                                </button>

                                <Field className='w-2/12' type="checkbox"
                                    render={() => {
                                        return (
                                            <label className='checkbox-container mt-8 p-20'>
                                                <input name="completed" type="checkbox" defaultChecked={task.completed} onChange={(e) => updateTask({ values: { body: task.body, completed: e.target.checked }, id: task.id })} />
                                                <span className="checkmark"></span>
                                            </label>
                                        );
                                    }}
                                />
                            </div>

                        </Form>
                    )
                    }

                </Formik >
            </div>
        </div >

    )
})

export default View