import React, { useState } from 'react';
import { useTrelloContext } from '../../contexts/TrelloContext';
import ColorPanel from './ColorPanel';
import { useAuthContext } from '../../contexts/AuthContext';
import CreateTaskModal from '../modals/CreateTaskModal';
import { useNavigate, useLocation } from 'react-router-dom';
import Admindashboard from '../Admin/AdminPanelLayout';

function Sidebar() {
    const {
        isSidebarOpen,
        toggleSidebar,
        isColorPanelOpen,
        toggleColorPanel,
        selectedColor,
    } = useTrelloContext();

    const { currentUser } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCancel = () => {
        setShowCreateModal(false);
    };

    return (
        <>

            <div
                className={`relative h-full ${isSidebarOpen ? 'w-64' : 'w-8'
                    } bg-gray-100 transition-all duration-300 border-r border-gray-300 shadow-md text-black flex flex-col`}
            >
                {/* Sidebar Toggle */}
                <div
                    className={`absolute top-5 -right-4 h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer transform transition-transform ${isSidebarOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                    onClick={toggleSidebar}
                >
                    <i className="ri-arrow-drop-right-line text-2xl"></i>
                </div>

                {/* Sidebar Content */}
                {isSidebarOpen && (
                    <>
                        {/* Create Task */}
                        <div className="px-6 py-4 bg-blue-100 border-b border-gray-200">
                            <button
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-all duration-300"
                                onClick={() => setShowCreateModal(true)}
                            >
                                Create Task
                            </button>
                        </div>

                        {/* Color Panel */}
                        <ColorPanel />

                        {/* Navigation Links */}
                        <div className="bg-white w-full px-4 py-4 border-b border-gray-200">
                            <nav className="flex flex-col space-y-1">
                                <div
                                    className={`flex items-center gap-3 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${location.pathname === '/home' ? 'bg-gray-300' : ''}`}
                                    onClick={() => navigate('/home')}
                                >
                                    <i className="ri-home-4-fill text-lg"></i>
                                    <span>Home</span>
                                </div>

                                {/* <div
                                    className={`flex items-center gap-3 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${location.pathname === '/adminpanel' ? 'bg-gray-300' : ''}`}
                                    onClick={() => navigate('/adminpanel')}
                                >
                                    <i className="ri-user-settings-fill"></i>
                                    <span>Admin Panel</span>
                                </div> */}


                                <div
                                    className={`flex items-center gap-3 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${location.pathname === '/board' ? 'bg-gray-300' : ''}`}
                                    onClick={() => navigate('/board')}
                                >
                                    <i className="ri-kanban-view text-lg"></i>
                                    <span>Board</span>
                                </div>
                                <div
                                    className={`flex items-center gap-3 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${location.pathname === '/reports' ? 'bg-gray-300' : ''}`}
                                    onClick={() => navigate('/reports')}
                                >
                                    <i className="ri-bar-chart-box-fill text-lg"></i>
                                    <span>Reports</span>
                                </div>
                                <div
                                    className={`flex items-center gap-3 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${location.pathname === '/settings' ? 'bg-gray-300' : ''}`}
                                    onClick={() => navigate('/settings')}
                                >
                                    <i className="ri-settings-4-fill text-lg"></i>
                                    <span>Settings</span>
                                </div>
                            </nav>
                        </div>

                        {/* Background Options */}
                        {/* <div className="w-full px-4 py-4 bg-gray-50 border-t border-gray-200 flex flex-col space-y-1">
                            <div className="font-medium text-gray-700 py-2">Choose Background</div>
                            <div
                                className="flex items-center gap-3 hover:bg-gray-200 px-2 py-2 rounded-md cursor-pointer transition-all duration-200"
                                onClick={toggleColorPanel}
                            >
                                <span
                                    className={`h-6 w-6 rounded-sm border ${selectedColor}`}
                                ></span>
                                <span className='text-sm'>Background Colors</span>
                            </div>
                            <div className="flex items-center gap-3 hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer transition-all duration-200">
                                <span className="h-6 w-6 bg-black rounded-sm"></span>
                                <span>Images</span>
                            </div>
                        </div> */}
                    </>
                )}
            </div>
            {/* Create Task Modal */}
            <CreateTaskModal
                show={showCreateModal}
                onClose={handleCancel}
            />
        </>
    );
}

export default Sidebar;
