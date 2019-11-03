import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { projectStoreFlag } from '../../store/modules/projects/actions'
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { Link } from 'react-router-dom';


const Store = connect(null, dispatch => bindActionCreators({ projectStoreFlag }, dispatch))((props) => {

    const { t } = useTranslation();
    const history = useHistory();

    // Validation Schema

    const validationSchema = Yup.object().shape({
        title: Yup
            .string()
            .min(3, t('phrases:min_error_msg'))
            .max(50, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg')),
        description: Yup
            .string()
            .min(5, t('phrases:min_error_msg'))
            .max(250, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg')),
    })


    return (
        <div className='w-4/12 m-auto'>
            <Formik initialValues={
                {
                    title: '',
                    description: ''
                }
            }
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    props.projectStoreFlag({ values, history })
                    resetForm()
                    setSubmitting(false)
                }

                }

            >
                {({ errors, touched, handleSubmit, isSubmitting }) => (
                    <div className="bg-white shadow-md rounded px-28 py-28">
                        <Form onSubmit={handleSubmit}>
                            <div className="my-20 mx-12">
                                <label className="px-4 block text-primary-700 text-sm font-bold mb-4" htmlFor="title">
                                    {t('phrases:title_label')}
                                </label>
                                <Field className={'shadow appearance-none border rounded w-full h-40 px-8 py-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' + (touched.title && errors.title ? 'border-solid border-1 border-danger-500' : '')}
                                    placeholder={t('phrases:title_input_placeholder')} type="text" name="title" />

                                {touched.title && errors.title ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="title" component="div" />) : null}

                            </div>

                            <div className="my-20 mx-12">
                                <label className="px-4 block text-primary-700 text-sm font-bold mb-4" htmlFor="description">
                                    {t('phrases:description_label')}
                                </label>
                                <Field className={'shadow appearance-none border rounded w-full h-160 px-8 py-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' + (touched.description && errors.description ? 'border-solid border-1 border-danger-500' : '')}
                                    placeholder={t('phrases:description_input_placeholder')} type="text" component="textarea" name="description" />
                                {touched.description && errors.description ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="description" component="div" />) : null}

                            </div>


                            <div className="my-28 mx-12 flex justify-between items-center">
                                <button className={'bg-primary-900 hover:bg-transparent text-white hover:text-primary-900 border border-transparent hover:border hover:border-primary-900 font-bold py-8 px-8 rounded rounded-8' + (isSubmitting || errors.title || errors.description ? ' opacity-50 cursor-not-allowed' : '')} type="submit" disabled={isSubmitting || errors.title || errors.description} type="submit">
                                    {t('phrases:submit_form_btn')}
                                </button>

                                <Link to='/projects' className='inline-block align-baseline font-bold text-sm text-primary-900 hover:underline'>
                                    {t('phrases:cancel_btn')}
                                </Link>
                            </div>
                        </Form>
                    </div>
                )
                }

            </Formik >

        </div>

    )
})

export default Store