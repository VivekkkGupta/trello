import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Maincontent from './Maincontent/Maincontent';
import { useTrelloContext } from '../../contexts/TrelloContext';

function UserDashboard() {
    const { selectedColor } = useTrelloContext();

    return (
        <div className={`w-full h-full ${selectedColor} text-white`}>
            <Navbar />
            <div className="flex h-[calc(100%-3rem)] overflow-hidden">
                <Sidebar className="h-full" />
                <Maincontent className="h-full overflow-y-scroll" />
            </div>
        </div>
    );
}

export default UserDashboard;
