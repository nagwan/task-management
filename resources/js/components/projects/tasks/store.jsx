import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from "react-i18next";
import { taskStoreFlag } from '../../../store/modules/projects/actions'


const Store = connect(null, dispatch => bindActionCreators({ taskStoreFlag }, dispatch))((props) => {

    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        body: Yup
            .string()
            .min(3, t('phrases:min_error_msg'))
            .max(50, t('phrases:max_error_msg'))
            .required(t('phrases:required_field_error_msg'))
    })


    return (
        <div className='card px-12 py-12'>
            <Formik initialValues={
                {
                    body: '',
                }
            }
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    props.taskStoreFlag({ values })
                    resetForm()
                    setSubmitting(false)
                }

                }

            >
                {({ errors, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field className={'shadow appearance-none border rounded w-full h-full px-8 py-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' + (errors.body ? 'border-solid border-1 border-danger-500' : '')}
                            placeholder={t('phrases:task_body_input_placeholder')} type="text" name="body" />
                        {errors.body ? (<ErrorMessage className='px-8 py-8 text-danger-500 text-xs italic' name="body" component="div" />) : null}
                    </Form>
                )
                }

            </Formik>
        </div>

    )
})

export default Store
