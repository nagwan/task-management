import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from "react-i18next";
import { logOutFlag } from '../../store/modules/authentication/actions'
import { Link } from 'react-router-dom';
import { toggleLang } from "../../helpers/functions"


const Navbar = connect(({ Authentication }) => ({ Authentication }), dispatch => bindActionCreators({ logOutFlag }, dispatch))((props) => {
    const { t, i18n } = useTranslation();
    return (
        <nav className='shadow h-80 w-full mb-60 flex justify-between items-center'>
            <div className='logo text-white bg-primary-900 w-2/12 h-60 mx-20 text-center flex cursor-pointer justify-center items-center text-bold'>
                <Link to={props.Authentication.is_auth ? '/' : '/projects'}>TASKY DO</Link>
            </div>

            <div className='border-info-900 border-solid w-3/12 h-60'>
                {
                    props.Authentication.user.id ?
                        <React.Fragment>
                            <button className="">
                                {props.Authentication.user.name}
                            </button>

                            <div className="">
                                <a className="" href="#">{t('phrases:logout')}</a>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <button className='mx-20 bg-primary-900 hover:bg-transparent text-white hover:text-primary-900 border border-transparent hover:border hover:border-primary-900 font-bold py-12 px-12 rounded rounded-8'>
                                <Link to='/registration' className=''>{t('phrases:create_account')}</Link>
                            </button>

                            <button className='mx-20 bg-transparent hover:bg-primary-900 text-primary-900 font-semibold hover:text-white py-12 px-12 border border-primary-900 hover:border-transparent rounded radius-8'>
                                <Link to='/login' className=''>{t('phrases:log_in')}</Link>
                            </button>

                            <button onClick={() => toggleLang(i18n)} className="inline-block align-baseline font-bold text-sm text-primary-900 hover:underline">{t('phrases:toggle_lang_btn')}</button>
                        </React.Fragment>
                }
            </div>


        </nav>
    )
})

export default Navbar