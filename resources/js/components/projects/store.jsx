import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
 
import { projectStoreFlag } from '../../store/modules/projects/actions'
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

const Store = connect(null, dispatch => bindActionCreators({ projectStoreFlag }, dispatch))((props) => {

    const { t } = useTranslation();
    const history = useHistory();

    // Validation Schema

    const validationSchema = Yup.object().shape({
        title: Yup
            .string()
            .min(3, t('phrases:min_error_msg'))
            .max(100, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg')),
        description: Yup
            .string()
            .min(3, t('phrases:min_error_msg'))
            .max(1000, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg')),
    })


    return (
        <Formik initialValues={
            {
                title: '',
                description: ''
            }
        }
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                props.projectStoreFlag({ values, history})
                resetForm()
                setSubmitting(false)
            }

            }

        >
            {({ errors, touched, handleSubmit, isSubmitting }) => (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <Form onSubmit={handleSubmit}>
                        <div className="my-12 mx-12">
                            <Field className={touched.title && errors.title ? 'has-error' : ''}
                                placeholder={t('phrases:title_input_placeholder')} type="text" name="title" />

                            {touched.title && errors.title ? (<ErrorMessage name="title" component="div" />) : null}

                        </div>

                        <div className="my-12 mx-12">
                            <Field className={touched.description && errors.description ? 'has-error form-control' : 'form-control'}
                                placeholder={t('phrases:description_input_placeholder')} type="text" component="textarea" name="description" />
                            {touched.description && errors.description ? (<ErrorMessage name="description" component="div" />) : null}

                        </div>


                        <div className="my-12 mx-12">
                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                {t('phrases:submit_form_btn')}
                            </button>
                        </div>
                    </Form>
                </div>
            )
            }

        </Formik >
    )
})

export default Store