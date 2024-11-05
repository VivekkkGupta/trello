import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { useTrelloContext } from '../../contexts/TrelloContext';
import Adminmaincontent from './Adminmaincontent';

function Admindashboard() {
    const { selectedColor } = useTrelloContext();
    return (

        <div className={`w-full h-full ${selectedColor} text-white`}>
            <Navbar />
            <div className="flex h-[calc(100%-3rem)] overflow-hidden">
                <Sidebar className="h-full" />
                <Adminmaincontent/>
            </div>
        </div>
    )
}

export default Admindashboard