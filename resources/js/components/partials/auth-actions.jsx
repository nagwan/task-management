import React from 'react'
import { Link } from 'react-router-dom';
import { toggleLang } from "../../helpers/functions"
import { useTranslation } from "react-i18next";


const AuthActions = (() => {

    const { t, i18n } = useTranslation();

    return (
        <div className='flex justify-center'>
            <button className='mx-20 bg-primary-900 hover:bg-transparent text-white hover:text-primary-900 border border-transparent hover:border hover:border-primary-900 font-bold py-12 px-12 rounded rounded-8'>
                <Link to='/registration' className=''>{t('phrases:create_account')}</Link>
            </button>

            <button className='mx-20 bg-transparent hover:bg-primary-900 text-primary-900 font-semibold hover:text-white py-12 px-12 border border-primary-900 hover:border-transparent rounded radius-8'>
                <Link to='/login' className=''>{t('phrases:log_in')}</Link>
            </button>

            <button onClick={() => toggleLang(i18n)} className="inline-block align-baseline font-bold text-sm text-primary-900 hover:underline">{t('phrases:toggle_lang_btn')}</button>
        </div>
    )
})

export default AuthActions