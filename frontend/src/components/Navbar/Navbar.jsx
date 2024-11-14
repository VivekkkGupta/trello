import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import CreateTaskModal from '../Modals/CreateTaskModal';

function Navbar() {
    const { handleLogout, showProfileDropDown, setShowProfileDropDown } = useAuthContext();
    const [showCreateModal, setShowCreateModal] = useState(false);


    const handleCancel = () => {
        setShowCreateModal(false);
    };

    return (
        <div className='h-[3rem] bg-opacity-60 bg-black border-b-[1px] border-opacity-40 border-gray-100'>
            <div className='innerdiv flex h-full w-full items-center justify-between px-10'>
                <div className='leftitems flex gap-[4rem] items-center'>

                    <div className='text-3xl font-bold cursor-pointer'><i className="ri-dashboard-fill"></i>&nbsp;Trello</div>

                    <div className='flex h-full w-full gap-2 items-center'>
                        <div className='px-3 py-1 cursor-pointer rounded-sm hover:bg-white hover:bg-opacity-40 font-[300]'>
                            Workspaces <i className="ri-arrow-drop-down-line"></i>
                        </div>
                        <div className='px-3 py-1 cursor-pointer rounded-sm hover:bg-white hover:bg-opacity-40 font-[300]'>
                            Starred <i className="ri-arrow-drop-down-line"></i>
                        </div>
                        <div
                            className='px-3 py-1 cursor-pointer rounded-sm bg-white bg-opacity-40 font-[300]'
                            onClick={() => setShowCreateModal(true)}
                        >
                            Create
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
                                className="absolute bg-black bg-opacity-80 rounded-lg right-0 px-6 py-2 top-[90%] z-10">
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
