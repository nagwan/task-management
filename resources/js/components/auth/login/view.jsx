import React from 'react'
import { useHistory } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";


const View = (({login}) => {

    const { t } = useTranslation();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email(t('phrases:email_error_msg'))
            .required(t('phrases:required_field_error_msg')),
        password: Yup
            .string()
            .min(6, t('phrases:min_error_msg'))
            .max(50, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg')),
    })


    return (

        <div className='w-4/12 m-auto'>
            <Formik initialValues={
                {
                    email: '',
                    password: ''
                }
            }
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    login({ values, history })
                    setSubmitting(false)
                }

                }

            >
                {({ errors, touched, handleSubmit, isSubmitting }) => (
                    <div className="bg-white shadow-md rounded px-28 py-28">
                        <Form onSubmit={handleSubmit}>
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


                            <div className="my-28 mx-12 flex items-center justify-between">

                                <button className={'bg-primary-900 hover:bg-transparent text-white hover:text-primary-900 border border-transparent hover:border hover:border-primary-900 font-bold py-8 px-8 rounded rounded-8' + (isSubmitting || errors.password || errors.email ? ' opacity-50 cursor-not-allowed' : '')} type="submit" disabled={isSubmitting || errors.password || errors.email}>
                                    {t('phrases:login_btn')}
                                </button>

                                <Link to='/forget-password' className='inline-block align-baseline font-bold text-sm text-primary-900 hover:underline'>
                                    {t('phrases:forget_password')}
                                </Link>
                            </div>
                        </Form>
                    </div>
                )
                }

            </Formik>
        </div>

    )

})

export default View