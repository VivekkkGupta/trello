import React, { useEffect, useRef } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

function Navbar() {
    const {
        handleLogout,
        showProfileDropDown,
        setShowProfileDropDown,
        currentUser,
    } = useAuthContext();

    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowProfileDropDown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowProfileDropDown]);

    return (
        <nav className="h-14 bg-white shadow-md border-b border-gray-300 text-black">
            <div className="container mx-auto px-6 flex items-center justify-between h-full">
                {/* Left Section */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <div className="text-3xl font-bold flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all duration-300">
                        <i className="ri-dashboard-fill text-indigo-600"></i>
                        <h1 className="tracking-tight text-indigo-800">Trello</h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-800 rounded-lg cursor-pointer transition-all duration-300">
                            Workspaces <i className="ri-arrow-drop-down-line"></i>
                        </div>
                        <div className="px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-800 rounded-lg cursor-pointer transition-all duration-300">
                            Starred <i className="ri-arrow-drop-down-line"></i>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    {/* Welcome Message */}
                    <div className="hidden sm:flex items-center text-gray-700 text-lg">
                        Hi,&nbsp;
                        <span className="font-medium text-indigo-800">
                            {currentUser["username"]}
                        </span>
                    </div>

                    {/* Profile Icon */}
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-700 cursor-pointer hover:shadow-sm hover:scale-102 transition-all duration-300"
                            onClick={() =>
                                setShowProfileDropDown((prevState) => !prevState)
                            }
                        >
                            <i className="ri-account-circle-fill text-3xl"></i>
                        </div>
                        {showProfileDropDown && (
                            <div
                                className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40 z-10 transition-opacity duration-300"
                            >
                                <div
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-800 cursor-pointer transition-all duration-300"
                                >
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
