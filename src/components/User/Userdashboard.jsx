import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Maincontent from '../Maincontent/Maincontent'

function Userdashboard() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-[#8061C5] to-[#E073BC]">
            <Navbar />
            <div className="flex h-[calc(100%-3rem)] overflow-hidden">
                <Sidebar className="h-full" />
                <Maincontent className="h-full overflow-y-scroll" />
            </div>
        </div>
    );
}


export default Userdashboard