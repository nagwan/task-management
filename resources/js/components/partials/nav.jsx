import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutFlag } from '../../store/modules/authentication/actions'
import { Link } from 'react-router-dom';
import AuthActions from './auth-actions';
import DropDown from './drop-down/index';

const Navbar = connect(({ Authentication }) => ({ Authentication }), dispatch => bindActionCreators({ logOutFlag }, dispatch))((props) => {
    return (
        <nav className='bg-primary-50 shadow w-full'>
            <div className='flex justify-between items-center py-8 px-20'>

                <div className='logo text-white bg-primary-900 w-2/12 h-60 text-center flex cursor-pointer justify-center items-center text-bold'>
                    <Link to='/'>Logo</Link>
                </div>

                {
                    props.Authentication.user.id ? <DropDown /> : <AuthActions />
                }

            </div>
        </nav>
    )
})

export default Navbar