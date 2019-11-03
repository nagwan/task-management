import React from 'react'
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

import { registrationFlag } from '../../store/modules/authentication/actions'
import { bindActionCreators } from 'redux';

const Register = connect(null, dispatch => bindActionCreators({ registrationFlag }, dispatch))((props) => {

    const { t } = useTranslation();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        name: Yup
            .string()
            .min(3, t('phrases:min_error_msg'))
            .max(100, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg')),
        email: Yup
            .string()
            .email(t('phrases:email_error_msg'))
            .required(t('phrases:required_field_error_msg')),
        password: Yup
            .string()
            .min(6, t('phrases:min_error_msg'))
            .max(50, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg')),
        password_confirmation: Yup // missing rule to check if it is === password
            .string()
            .min(6, t('phrases:min_error_msg'))
            .max(50, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg')),
    })

    return (
        <div className='w-4/12 m-auto'>

            <Formik initialValues={
                {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                }
            }
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    props.registrationFlag({ data: values, history })
                    //console.log(values)
                    setSubmitting(false)
                    // dispatch an action to reset the form
                }

                }

            >
                {({ errors, touched, handleSubmit, isSubmitting }) => (
                    <div className="bg-white shadow-md rounded px-28 py-28">
                        <Form method="post" onSubmit={handleSubmit}>

                            <div className="my-20 mx-12">
                                <label className="px-4 block text-primary-700 text-sm font-bold mb-4" htmlFor="name">
                                    {t('phrases:name_label')}
                                </label>

                                <Field className={'shadow appearance-none border rounded w-full h-40 px-8 py-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' + (touched.name && errors.name ? 'border-solid border-1 border-danger-500' : '')}
                                    placeholder={t('phrases:name_input_placeholder')} type="text" name="name" />

                                {touched.name && errors.name ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="name" component="div" />) : null}
                            </div>

                            <div className="my-20 mx-12">
                                <label className="px-4 block text-primary-700 text-sm font-bold mb-4" htmlFor="email">
                                    {t('phrases:email_label')}
                                </label>
                                <Field className={'shadow appearance-none border rounded w-full h-40 px-8 py-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' + (touched.email && errors.email ? 'border-solid border-1 border-danger-500' : '')}
                                    placeholder={t('phrases:email_input_placeholder')} type="email" name="email" />
                                {touched.email && errors.email ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="email" component="div" />) : null}
                            </div>

                            <div className="my-20 mx-12">
                                <label className="px-4 block text-primary-700 text-sm font-bold mb-4" htmlFor="password">
                                    {t('phrases:password_label')}
                                </label>
                                <Field className={'shadow appearance-none border rounded w-full h-40 px-8 py-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' + (touched.password && errors.password ? 'border-solid border-1 border-danger-500' : '')}
                                    placeholder={t('phrases:password_input_placeholder')} type="password" name="password" />
                                {touched.password && errors.password ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="password" component="div" />) : null}
                            </div>


                            <div className="my-20 mx-12">
                                <label className="px-4 block text-primary-700 text-sm font-bold mb-4" htmlFor="password_confirmation">
                                    {t('phrases:password_confirmation_label')}
                                </label>
                                <Field className={'shadow appearance-none border rounded w-full h-40 px-8 py-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' + (touched.password_confirmation && errors.password_confirmation ? 'border-solid border-1 border-danger-500' : '')}
                                    placeholder={t('phrases:password_confirmation_input_placeholder')} type="password" name="password_confirmation" />
                                {touched.password_confirmation && errors.password_confirmation ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="password_confirmation" component="div" />) : null}
                            </div>

                            <div className="my-28 mx-12 flex justify-center">
                                <button className={'bg-primary-900 hover:bg-transparent text-white hover:text-primary-900 border border-transparent hover:border hover:border-primary-900 font-bold py-8 px-8 rounded rounded-8' + (isSubmitting || errors.name || errors.email || errors.password || errors.password_confirmation ? ' opacity-50 cursor-not-allowed' : '')} type="submit" disabled={isSubmitting || errors.name || errors.password || errors.password_confirmation || errors.email} type="submit">
                                    {t('phrases:create_account_btn')}
                                </button>
                            </div>
                        </Form>
                    </div>
                )
                }

            </Formik >
        </div>
    )
})

export default Register