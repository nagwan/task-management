import React from 'react'
import { useTranslation } from "react-i18next";

import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"


const ForgetPassword = (() => {
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email(t('phrases:email_error_msg'))
            .required(t('phrases:required_field_error_msg')),
    })

    return (
        <div className='w-4/12 m-auto'>

            <Formik initialValues={
                {
                    email: '',
                }
            }
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    console.log(values)
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
                                <button className={'w-full h-40 bg-primary-900 hover:bg-transparent text-white hover:text-primary-900 border border-transparent hover:border hover:border-primary-900 font-bold py-8 px-8 rounded rounded-8' + (isSubmitting || errors.email ? ' opacity-50 cursor-not-allowed' : '')} type="submit" disabled={isSubmitting || errors.email} type="submit">
                                    {t('phrases:send_reset_password_link_btn')}
                                </button>
                            </div>
                        </Form>
                    </div>
                )
                }

            </Formik >
        </div >
    )
})

export default ForgetPassword
