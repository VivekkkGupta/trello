import React from 'react';

const Taskcard = ({ task, onDragStart }) => {
    return (
        <div
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-xl transition-all"
            draggable
            onDragStart={onDragStart}
        >
            <div className="flex justify-between items-start">
                {/* Task ID and Title */}
                <h3 className="text-md font-semibold text-gray-800">
                    #{task.id} {task.title}
                </h3>
                {/* Task Status */}
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${task.state === 'To Do' ? 'bg-yellow-400' : task.state === 'In Progress' ? 'bg-blue-500' : task.state === 'Completed' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {task.state}
                </span>
            </div>
            {/* Task Description */}
            <p className="text-sm text-gray-600 mt-2">{task.description}</p>
            {/* Task Assigned User */}
            <div className="mt-2 text-xs text-gray-500">Assigned to: {task.assignedTo.name}</div>
        </div>
    );
};

export default Taskcard;
