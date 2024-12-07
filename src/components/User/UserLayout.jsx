import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { useTrelloContext } from '../../contexts/TrelloContext';

function UserLayout({ children }) {
    const { selectedColor } = useTrelloContext();

    return (
        <div className={`w-full h-full ${selectedColor} text-white`}>
            <Navbar />
            <div className="flex h-[calc(100%-3.5rem)] overflow-hidden">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}

export default UserLayout;
