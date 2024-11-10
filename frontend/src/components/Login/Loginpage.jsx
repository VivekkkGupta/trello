import React, { useState } from 'react'
import Loginform from './Loginform'
import Signupform from './Signupform'
import { useAuthContext } from '../../contexts/AuthContext'

function Loginpage() {

    const { loginOrSignUpPage } = useAuthContext()

    return (
        <div className='w-full h-full bg-gray-400 flex items-center justify-center'>
            <div className='w-[90%] h-[90%] rounded-xl bg-white bg-opacity-60 shadow-lg flex md:flex-row flex-col p-12 gap-12'>
                <div className='rounded-md  w-full h-full flex items-center justify-center text-center flex-col'>
                    <h1 className='font-bold text-8xl'>
                        Trello
                    </h1>
                    <h2 className='font-bold text-3xl mt-10'>
                        Modern Ticketing Tool
                    </h2>
                </div>
                <div className='rounded-md bg-white bg-opacity-60 w-full h-full shadow-lg flex items-center justify-center flex-col gap-2'>
                    {
                        loginOrSignUpPage === true ? <Signupform /> : <Loginform />
                    }
                </div>
            </div>
        </div>
    )
}

export default Loginpage