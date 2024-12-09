import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { useTrelloContext } from '../../contexts/TrelloContext';
import Adminmaincontent from './Adminmaincontent';
import Rightsidebar from './Rightsidebar';

function Admindashboard() {
    const { selectedColor } = useTrelloContext();
    return (
        <>
            <Adminmaincontent />
            <Rightsidebar />
        </>
    )
}

export default Admindashboard