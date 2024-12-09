import React, { useState } from 'react';
import { useTrelloContext } from '../../../contexts/TrelloContext';
import { useAuthContext } from '../../../contexts/AuthContext';

function SettingsLayout() {
    return (
        <div className='p-4 h-full w-full'>
            <div className='p-6 bg-gray-100 text-black rounded-lg shadow-lg h-fit w-full flex justify-center'>
                <div className='w-[50%] flex flex-col items-center'>
                    <h1 className='font-bold text-3xl mb-6'>Settings</h1>
                    <SettingsTabs />
                </div>
            </div>
        </div>
    );
}

export default SettingsLayout;

function SettingsTabs() {
    const { selectedColor, toggleColorPanel } = useTrelloContext();
    const { handleLogout } = useAuthContext()

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`h-full w-full text-black`}>
            <div className='p-6 rounded-lg bg-white shadow-lg'>
                <div className='flex flex-col space-y-4'>

                    {/* <div className='flex justify-between items-center  cursor-pointer hover:bg-gray-200 p-4 rounded-md transition duration-300'>
                        <span className='font-medium'>Dark Mode</span>
                        <button
                            onClick={toggleDarkMode}
                            className='p-2 w-12 h-12 rounded bg-blue-500 text-white hover:bg-blue-700 transition duration-300'
                        >
                            {darkMode ? (<i class="ri-sun-fill"></i>) : (<i class="ri-moon-fill"></i>)}
                        </button>
                    </div> */}

                    <div className='flex justify-between items-center cursor-pointer  hover:bg-gray-200 p-4 rounded-md transition duration-300'
                        onClick={toggleColorPanel}>
                        <span className='font-medium'>Change Background</span>
                        <span className={`h-12 w-20 rounded-md border cursor-pointer ${selectedColor}`}

                        ></span>
                    </div>

                    <div className='flex justify-between items-center cursor-pointer  hover:bg-gray-200 p-4 rounded-md transition duration-300'
                        onClick={handleLogout}
                    >
                        <span className='font-medium'>Logout</span>
                        <span className='text-2xl'><i className="ri-logout-box-r-line"></i></span>
                    </div>

                </div>
            </div>
        </div>
    );
}