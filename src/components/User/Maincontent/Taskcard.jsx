import React, { useState, useCallback } from 'react';
import TaskModal from './TaskModal/TaskModal'; // Import the TaskModal component

const Taskcard = ({ task, onDragStart, isDragging }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isOverdue = new Date(task.dueDate) < new Date(); // Check if the due date is in the past

    // Memoize the onClose function to avoid unnecessary re-renders
    const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

    return (
        <>
            <div
                className={`bg-white shadow-lg rounded-lg p-4 border cursor-pointer hover:shadow-2xl duration-300 transition-all 
                    ${isDragging ? 'opacity-50 border-1 border-black' : 'opacity-100'}`}
                draggable
                onDragStart={onDragStart}
                onClick={() => setIsModalOpen(true)} // Open the modal on click
            >
                <div className="flex justify-between items-center">
                    {/* Task ID and Title */}
                    <h3 className="text-md font-semibold text-gray-600 truncate text-xs">
                        # {task._id}
                    </h3>
                    {/* Task Status */}
                    <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${task.state === 'Todos'
                            ? 'bg-blue-500'
                            : task.state === 'InProgress'
                                ? 'bg-yellow-400'
                                : task.state === 'Done'
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                            } text-white`}
                    >
                        {task.state}
                    </span>
                </div>
                <h3 className="mt-1 text-md font-semibold text-gray-900 truncate">
                    {task.title}
                </h3>
                {/* Task Description */}
                <p className="text-xs text-gray-600 mt-1">{task.description}</p>
                {/* Task Assigned User */}
                {/* <div className="mt-3 text-xs text-gray-500">
                    Assigned to: {task.assignedTo.username}
                </div> */}
                {/* Due Date */}
                <div
                    className={`mt-4 text-xs font-semibold ${isOverdue ? 'text-red-500' : 'text-green-500'
                        }`}
                >
                    Due Date: {new Date(task.dueDate).toLocaleDateString()}{' '}
                    <span className="ml-2 px-2 py-1 text-xs rounded-full font-medium bg-gray-100">
                        {isOverdue ? 'Overdue' : 'Underdue'}
                    </span>
                </div>
            </div>
            {/* Task Modal */}
            {isModalOpen && (
                <TaskModal taskfromparent={task} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

export default Taskcard;
