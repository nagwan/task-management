import React from 'react'
import { useTranslation } from "react-i18next";

import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"


const ResetPassword = (() => {
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email(t('phrases:email_error_msg'))
            .required(t('phrases:required_field_error_msg')),
    })

    return (
        <div>
            <h1>
                RESET PASSWORD COMPONENT
            </h1>

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
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <Form onSubmit={handleSubmit}>

                            <div className="my-12 mx-12">
                                <Field className={touched.email && errors.email ? 'has-error form-control' : 'form-control'}
                                    placeholder={t('phrases:email_input_placeholder')} type="email" name="email" />
                                {touched.email && errors.email ? (<ErrorMessage name="email" component="div" />) : null}
                            </div>



                            <div className="my-12 mx-12">
                                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
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

export default ResetPassword