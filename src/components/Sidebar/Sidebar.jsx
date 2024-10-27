import React from 'react'



function Sidebar() {
    return (
        <div className='relative h-full w-1/5 bg-opacity-30 bg-white '>
            <div className='absolute right-2 top-3 bg-white rounded-full h-8 w-8 flex items-center justify-center'>
                <i className="ri-arrow-drop-right-line text-2xl"></i>
            </div>
        </div>
    )
}

export default Sidebar