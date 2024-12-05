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
        <div className={`relative h-full ${isSidebarOpen ? "w-1/5" : "w-6"}  bg-gray-200 transition-all duration-300 text-black  border-r border-opacity-40  border-black shadow-lg`}>
            <div className={`absolute ${isSidebarOpen ? "right-2 rotate-[180deg]" : "right-[-50%] rotate-0"} top-2 opacity-80 rounded-full h-8 w-8 flex items-center justify-center transition-all duration-300 cursor-pointe bg-black text-white cursor-pointer`}
                onClick={toggleSidebar}
            >
                <i className="ri-arrow-drop-right-line text-2xl "></i>
            </div>

            {isSidebarOpen && (
                <>
                    <div className='nameplate h-12 w-full flex items-center justify-center border-b-[1px] border-black border-opacity-40 text-xl font-[400]'>
                        Welcome&nbsp;<span className='font-[500]'>{currentUser["username"]} !</span>
                    </div>

                    <ColorPanel />

                    {/* <div className='options flex flex-col border-b-[1px] border-white border-opacity-40'>
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
                    </div> */}

                    <div className='bg-gray-200 w-full px-6 py-3 border-b-[1px] border-black border-opacity-40'>
                        <div className=''>
                            <div className='px-3 py-2 hover:bg-gray-300 cursor-pointer rounded-md  flex items-center gap-2'><i class="ri-home-4-fill text-lg"></i>Home</div>
                            <div className='px-3 py-2 hover:bg-gray-300 cursor-pointer rounded-md  flex items-center gap-2'><i class="ri-kanban-view-2 text-lg"></i>Board</div>
                            <div className='px-3 py-2 hover:bg-gray-300 cursor-pointer rounded-md  flex items-center gap-2'><i class="ri-bar-chart-box-fill text-lg"></i>Reports</div>
                            <div className='px-3 py-2 hover:bg-gray-300 cursor-pointer rounded-md  flex items-center gap-2'><i class="ri-settings-4-fill text-lg"></i>Settings</div>
                        </div>
                    </div>

                    <div className='w-full flex items-center flex-col'>
                        <div className='w-full flex items-center gap-2 font-[400] p-3'>
                            Choose Background
                        </div>
                        <div className='w-full h-9 hover:bg-gray-500 hover:bg-opacity-40 cursor-pointer flex items-center gap-2 px-5 italic font-[300]' onClick={toggleColorPanel}>
                            <span className={`h-6 w-6 ${selectedColor} rounded-sm`}></span>
                            Colors
                        </div>
                        <div className='w-full h-9 hover:bg-gray-500 hover:bg-opacity-40 cursor-pointer flex items-center gap-2 px-5 italic font-[300]'>
                            <span className="h-6 w-6 bg-black rounded-sm"></span>
                            Images
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Sidebar;
