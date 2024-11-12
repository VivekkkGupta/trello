import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'

function ShowTaskRightPanel() {

    const { handleStateChange, handleUserChange, currentTask, usersList } = useAuthContext()
    
    return (
        <div className="bg-gray-100 w-[28%] h-[95%] rounded-lg flex self-end text-sm overflow-y-auto">
            <div className="w-full p-3 flex flex-col gap-3">
                <div className="w-full bg-gray-200 rounded-lg px-3 py-2">
                    <label className="font-[500] inline">State : </label>
                    <select className="ml-2 p-2 rounded bg-white" value={currentTask.state || ""} onChange={handleStateChange}>
                        <option value="Todos">Todos</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>

                <div className="w-full bg-gray-200 rounded-lg px-3 py-2">
                    <label className="font-[500] inline">Assigned : </label>
                    <select className="ml-2 p-2 rounded bg-white" value={currentTask.assignedTo?._id || ""} onChange={handleUserChange}>
                        {usersList.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ShowTaskRightPanel