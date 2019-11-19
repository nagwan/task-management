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

                <div className='logo w-2/12 h-60 cursor-pointer'>
                    <Link to='/'></Link>
                </div>

                {
                    props.Authentication.user.id ? <DropDown /> : <AuthActions />
                }

            </div>
        </nav>
    )
})

export default Navbar