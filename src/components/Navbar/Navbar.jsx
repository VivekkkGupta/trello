import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import CreateTaskModal from '../modals/CreateTaskModal'

function Navbar() {
    const { handleLogout, showProfileDropDown, setShowProfileDropDown } = useAuthContext();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCancel = () => {
        setShowCreateModal(false);
    };

    return (
        <div className='h-[3.5rem]  bg-gray-200 border-b-[2px] border-opacity-40 border-black text-black'>
            <div className='innerdiv flex h-full w-full items-center justify-between px-10'>
                <div className='leftitems flex gap-[4rem] items-center'>

                    <div className='text-3xl flex font-bold cursor-pointer'>
                        <i className="ri-dashboard-fill"></i>
                        &nbsp;
                        <h1 className='tracking-tighter text-indigo-800'>Trello</h1>
                    </div>

                    <div className='pl-12 flex h-full w-full gap-2 items-center'>
                        {/* <div className='px-3 py-1 cursor-pointer rounded-sm hover:bg-white hover:bg-opacity-40 font-[300]'>
                            Workspaces <i className="ri-arrow-drop-down-line"></i>
                        </div>
                        <div className='px-3 py-1 cursor-pointer rounded-sm hover:bg-white hover:bg-opacity-40 font-[300]'>
                            Starred <i className="ri-arrow-drop-down-line"></i>
                        </div> */}
                        <div
                            className='px-3 py-2 text-sm cursor-pointer rounded-sm bg-blue-600 hover:bg-blue-700 duration-300 transition-all text-white font-[500]'
                            onClick={() => setShowCreateModal(true)}
                        >
                            Create Task
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className="rightitems flex items-center justify-center w-10 h-10 rounded-full">
                        <i className="ri-information-line text-xl cursor-pointer"></i>
                    </div>
                    <div
                        className="relative rightitems flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
                    >
                        <i onClick={() => setShowProfileDropDown(prevState => !prevState)} className="ri-account-circle-fill text-3xl"></i>
                        {showProfileDropDown && (
                            <div
                                onClick={handleLogout}
                                className="absolute bg-gray-100 hover:bg-gray-200 border border-black hover:shadow-lg transition-all duration-300 rounded-lg right-0 px-6 py-2 top-[90%] z-10">
                                Logout
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Create Task Modal */}
            <CreateTaskModal
                show={showCreateModal}
                onClose={handleCancel}
            />
        </div>
    );
}

export default Navbar;
