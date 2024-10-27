import React from 'react'

function Navbar() {
    return (
        <div className='h-[3rem] bg-opacity-40 bg-white'>
            <div className='innerdiv flex h-full w-full items-center justify-between px-10'>
                <div className='leftitems flex gap-[4rem] items-center'>
                    <div className='text-2xl font-bold'>Trello</div>
                    <div className='flex h-full w-full gap-2 items-center'>
                        <div className=' px-3 py-1 cursor-pointer rounded-sm hover:bg-white hover:bg-opacity-40 '>
                            Workspaces <i className="ri-arrow-drop-down-line"></i>
                        </div>
                        <div className=' px-3 py-1 cursor-pointer rounded-sm hover:bg-white hover:bg-opacity-40 '>
                            Starred <i className="ri-arrow-drop-down-line"></i>
                        </div>
                        <div className=' px-3 py-1 cursor-pointer rounded-sm bg-white bg-opacity-40 '>
                            <button className=''>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className="rightitems flex items-center justify-center w-10 h-10 rounded-full">
                        <i className="ri-information-line text-xl cursor-pointer"></i>
                    </div>
                    <div className="rightitems flex items-center justify-center w-10 h-10 rounded-full">
                        <i className="ri-account-circle-fill text-3xl cursor-pointer"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar