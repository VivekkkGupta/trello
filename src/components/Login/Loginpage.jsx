import React from 'react'

function Loginpage() {
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
                <div className='rounded-md bg-white bg-opacity-60 w-full h-full shadow-lg flex items-center justify-center flex-col'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-3 mb-10 w-[50%]'>
                        <label htmlFor="username" className='text-lg font-[500]'>Email</label>
                        <input type="text" id="username" className='outline-0 px-3 py-2 rounded-md shadow-sm w-full'/>
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-3 mb-10 w-[50%]'>
                        <label htmlFor="password" className='text-lg font-[500]'>Password</label>
                        <input type="password" id="password" className='outline-0 px-3 py-2 rounded-md shadow-sm w-full'/>
                    </div>
                    <div className='w-[50%] h-12 flex flex-col md:flex-row justify-around items-center gap-5'>
                        <button className='w-full bg-slate-400 py-2 px-3 rounded-md font-[500] hover:bg-slate-500 duration-200 transition-all'>Sign Up</button>
                        <button className='w-full bg-green-500 py-2 px-3 rounded-md font-[500] hover:bg-green-600 duration-200 transition-all'>Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginpage