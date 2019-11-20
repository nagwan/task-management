import React from 'react'
import { Link } from 'react-router-dom';
import AuthActions from '../auth-actions';
import DropDown from '../drop-down/index';

const View = (({user}) => {
    return (
        <nav className='bg-primary-50 shadow w-full'>
            <div className='flex justify-between items-center py-8 px-20'>

                <div className='logo w-2/12 h-60 cursor-pointer'>
                    <Link to='/'></Link>
                </div>

                {
                    user.id ? <DropDown /> : <AuthActions />
                }

            </div>
        </nav>
    )
})

export default View