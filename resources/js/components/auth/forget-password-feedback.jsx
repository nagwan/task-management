import React from 'react'
import { useTranslation } from "react-i18next";


const ForgetPasswordFeedBack = (() => {
    const { t } = useTranslation()

    return (
        <h1>{t('phrases:forget_password_feedback_msg')}</h1>
    )
})

export default ForgetPasswordFeedBack