import React from 'react';
import { useAuthContext } from '../../../../contexts/AuthContext';

function ShowTaskRightPanel() {
    const { handleStateChange, handleUserChange, currentTask, usersList, formatTimestamp } = useAuthContext();

    // Check if the task is overdue
    const isTaskOverdue = new Date(currentTask.dueDate) < new Date();

    const handleDeleteTask = () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            console.log("delete the task")
        }
    };

    return (
        <div className="bg-gray-100 w-[28%] h-[95%] rounded-lg flex self-end text-sm overflow-y-auto">
            <div className="w-full p-3 flex flex-col gap-3">
                {/* State Section */}
                <div className="w-full bg-gray-200 rounded-lg px-3 py-2">
                    <label className="font-[500] inline">State : </label>
                    <select className="ml-2 p-2 rounded bg-white" value={currentTask.state || ""} onChange={handleStateChange}>
                        <option value="Todos">Todos</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>

                {/* Assigned Section */}
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

                {/* Task Due Status Section */}
                <div className="w-full bg-gray-200 rounded-lg px-3 py-2">
                    <label className="font-[500] inline">Task Due: </label>
                    <div className={`mt-1 p-2 rounded ${isTaskOverdue ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                        {isTaskOverdue ? 'Overdue' : 'On Time'}
                    </div>
                </div>

                {/* Created On Section */}
                <div className="w-full bg-gray-200 rounded-lg px-3 py-2">
                    <label className="font-[500] inline">Created On : </label>
                    <div className="mt-1 p-2 rounded bg-white">
                        {formatTimestamp(currentTask.notes[0].timestamp)}
                    </div>
                </div>

                {/* Due Date Section */}
                <div className="w-full bg-gray-200 rounded-lg px-3 py-2">
                    <label className="font-[500] inline">Due Date: </label>
                    <div className="mt-1 p-2 rounded bg-white">
                        {formatTimestamp(currentTask.dueDate)}
                    </div>
                </div>

                <div className="w-full p-3 mt-auto">
                    <button
                        onClick={handleDeleteTask}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete Task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShowTaskRightPanel;
