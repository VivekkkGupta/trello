import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { useTrelloContext } from '../../contexts/TrelloContext';
import Adminmaincontent from './AdminMainContent/Adminmaincontent';
import Rightsidebar from './AdminRightSideBar/Rightsidebar';

function AdminPanelLayout() {

    return (
        <>
            <Adminmaincontent />
            <Rightsidebar />
        </>
    )
}

export default AdminPanelLayout