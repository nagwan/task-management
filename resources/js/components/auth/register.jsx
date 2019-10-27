import React from 'react'
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

import {registrationFlag} from '../../store/modules/authentication/actions'
import { bindActionCreators } from 'redux';

const Register = connect(null, dispatch => bindActionCreators({registrationFlag}, dispatch))((props) => {

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
        <div>
            <h1>
                REGISTRATION COMPONENT
            </h1>

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
                    props.registrationFlag({data: values, history})
                    //console.log(values)
                    setSubmitting(false)
                }

                }

            >
                {({ errors, touched, handleSubmit, isSubmitting }) => (
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <Form method ="post" onSubmit={handleSubmit}>

                            <div className="my-12 mx-12">
                                <Field className={touched.name && errors.name ? 'has-error' : ''}
                                    placeholder={t('phrases:name_input_placeholder')} type="text" name="name" />

                                {touched.name && errors.name ? (<ErrorMessage name="name" component="div" />) : null}
                            </div>

                            <div className="my-12 mx-12">
                                <Field className={touched.email && errors.email ? 'has-error form-control' : 'form-control'}
                                    placeholder={t('phrases:email_input_placeholder')} type="email" name="email" />
                                {touched.email && errors.email ? (<ErrorMessage name="email" component="div" />) : null}
                            </div>

                            <div className="my-12 mx-12">
                                <Field className={touched.password && errors.password ? 'has-error form-control' : 'form-control'}
                                    placeholder={t('phrases:password_input_placeholder')} type="password" name="password" />
                                {touched.password && errors.password ? (<ErrorMessage name="password" component="div" />) : null}
                            </div>


                            <div className="my-12 mx-12">
                                <Field className={touched.password_confirmation && errors.password_confirmation ? 'has-error form-control' : 'form-control'}
                                    placeholder={t('phrases:password_confirmation_input_placeholder')} type="password" name="password_confirmation" />
                                {touched.password_confirmation && errors.password_confirmation ? (<ErrorMessage name="password_confirmation" component="div" />) : null}
                            </div>

                            <div className="my-12 mx-12">
                                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
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