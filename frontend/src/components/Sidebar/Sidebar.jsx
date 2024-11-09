import React, { useState } from 'react';
import { useTrelloContext } from '../../contexts/TrelloContext';
import ColorPanel from './ColorPanel'
import { useAuthContext } from '../../contexts/AuthContext';

function Sidebar() {
    const { isSidebarOpen, toggleSidebar,
        isColorPanelOpen, setIsColorPanelOpen, toggleColorPanel, selectedColor,
    } = useTrelloContext();

    const { currentUser } = useAuthContext()
    return (
        <div className={`relative h-full ${isSidebarOpen ? "w-1/5" : "w-6"} bg-opacity-50 bg-black transition-all duration-200`}>
            <div className={`absolute ${isSidebarOpen ? "right-2 rotate-[180deg]" : "right-[-50%] rotate-0"} top-2 bg-white opacity-80 rounded-full h-8 w-8 flex items-center justify-center transition-all duration-200 cursor-pointer`}
                onClick={toggleSidebar}
            >
                <i className="ri-arrow-drop-right-line text-2xl text-black"></i>
            </div>

            {isSidebarOpen && (
                <>
                    <div className='nameplate h-12 w-full flex items-center justify-center border-b-[1px] border-white border-opacity-40 text-xl font-[400]'>
                        Hello&nbsp;<span className='font-[500]'>{currentUser["username"]} !</span>
                    </div>

                    <ColorPanel />

                    <div className='options flex flex-col border-b-[1px] border-white border-opacity-40'>
                        <div className='w-full h-9 flex items-center gap-2 p-3 font-[400]'>
                            <i className="ri-dashboard-fill"></i>
                            Board Views
                        </div>
                        <div className='w-full h-9 hover:bg-white hover:bg-opacity-40 cursor-pointer flex items-center gap-2 px-5 italic font-[300]'>
                            <i className="ri-layout-column-line"></i>
                            Cards
                        </div>
                        <div className='w-full h-9 hover:bg-white hover:bg-opacity-40 cursor-pointer flex items-center gap-2 px-5 italic font-[300]'>
                            <i className="ri-list-check"></i>
                            List
                        </div>
                    </div>

                    <div className='w-full flex items-center mt-1 flex-col'>
                        <div className='w-full flex items-center gap-2 font-[400] p-3'>
                            Change Background
                        </div>
                        <div className='w-full h-9 hover:bg-white hover:bg-opacity-40 cursor-pointer flex items-center gap-2 px-5 italic font-[300]' onClick={toggleColorPanel}>
                            <span className={`h-6 w-6 ${selectedColor} rounded-sm`}></span>
                            Colors
                        </div>
                        <div className='w-full h-9 hover:bg-white hover:bg-opacity-40 cursor-pointer flex items-center gap-2 px-5 italic font-[300]'>
                            <span className="h-6 w-6 bg-white rounded-sm"></span>
                            Images
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Sidebar;
