import React from 'react'
import { Link } from 'react-router-dom';
import { toggleLang } from "../../../helpers/functions"
import { useTranslation } from "react-i18next";

const View = (({ user, closeMenu }) => {

    const { t, i18n } = useTranslation();

    return (

        <div className="bg-white z-10 mt-40 shadow-md rounded py-12 w-2/12 absolute right-0 w-full">
            <Link onClick={closeMenu} to={`/me/${user.id}`} className='flex justify-between align-center py-8 px-12 hover:bg-primary-900 hover:text-white cursor-pointer'>
                <span>{t('phrases:profile')}</span>
                <i className="fas fa-user"></i>
            </Link>

            <Link onClick={closeMenu} to='/projects' className='flex justify-between items-center py-8 px-12 hover:bg-primary-900 hover:text-white cursor-pointer'>
                <span >{t('phrases:projects')}</span>
                <i className="fas fa-layer-group"></i>
            </Link>

            <Link onClick={closeMenu} to='/new-project' className='flex justify-between items-center py-8 px-12 hover:bg-primary-900 hover:text-white cursor-pointer'>
                <span>{t('phrases:create_project')}</span>
                <i className="far fa-plus-square"></i>
            </Link>

            <div onClick={() => toggleLang(i18n), closeMenu} className='flex justify-between items-center py-8 px-12 hover:bg-primary-900 hover:text-white cursor-pointer'>
                <span>{t('phrases:setting')}</span>
                <i className="fas fa-users-cog"></i>
            </div>

            <div onClick={closeMenu} className='flex justify-between items-center py-8 px-12 hover:bg-primary-900 hover:text-white cursor-pointer'>
                <span onClick={() => toggleLang(i18n)}>{t('phrases:toggle_lang_btn')}</span>
                <i className="fas fa-language"></i>
            </div>

            <div onClick={closeMenu} className='flex justify-between items-center py-8 px-12 hover:bg-primary-900 hover:text-white cursor-pointer'>
                <Link to=''>{t('phrases:logout')}</Link>
                <i className="fas fa-walking"></i>
            </div>
        </div>
    )
})

export default View