import React from 'react'
import { useTranslation } from "react-i18next";
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { Link } from 'react-router-dom';


const View = (({ inviteUser }) => {

    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email(t('phrases:email_error_msg'))
            .required(t('phrases:required_field_error_msg')),
    })


    return (
        <div className='w-full'>
            <Formik initialValues={
                {
                    email: '',
                }
            }
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {

                    setSubmitting(true)

                    inviteUser(values)

                    resetForm()

                    setSubmitting(false)
                }

                }

            >
                {({ errors, touched, handleSubmit, isSubmitting }) => (
                    <div className="min-h-240 card py-20 hover:shadow-lg">
                        <div className='w-full min-h-60 py-20 px-20 flex align-center justify-center'>
                            <p className='text-primary-900 font-semibold'>{t('phrases:invite_others')}</p>
                        </div>

                        <Form onSubmit={handleSubmit}>

                            <div className="my-20 mx-12">
                                <Field className={'shadow appearance-none border rounded w-full h-40 px-8 py-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' + (touched.title && errors.title ? 'border-solid border-1 border-danger-500' : '')}
                                    placeholder={t('phrases:email_input_placeholder')} type="email" name="email" />

                                {touched.email && errors.email ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="email" component="div" />) : null}
                            </div>


                            <div className="mt-12 flex justify-center items-center">
                                <button className={'bg-primary-900 hover:bg-transparent text-white hover:text-primary-900 border border-transparent hover:border hover:border-primary-900 font-bold py-8 px-8 rounded rounded-8' + (isSubmitting || errors.email ? ' opacity-50 cursor-not-allowed' : '')} type="submit" disabled={isSubmitting || errors.email} type="submit">
                                    {t('phrases:submit_form_btn')}
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

export default View;