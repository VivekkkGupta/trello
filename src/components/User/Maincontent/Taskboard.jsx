import React, { useState, useEffect } from 'react';
import Taskcard from './Taskcard';
import { useAuthContext } from '../../../contexts/AuthContext';

const Taskboard = () => {
    const { currentUser, allTasks, editTaskFromApiCall } = useAuthContext();

    const [draggedTask, setDraggedTask] = useState(null);
    const [draggedTaskId, setDraggedTaskId] = useState(null); // Track dragged task's ID
    const [hoveredColumn, setHoveredColumn] = useState(null);
    const [currentUserTasks, setCurrentUserTasks] = useState([]);

    const columnNames = {
        Todos: 'To Do',
        InProgress: 'In Progress',
        Done: 'Completed',
        Failed: 'Failed',
    };

    const handleDragStart = (task) => {
        setDraggedTask(task);
        setDraggedTaskId(task._id); // Set the dragged task's ID
    };

    const handleDragEnter = (columnId) => {
        setHoveredColumn(columnId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragLeave = () => {
        setHoveredColumn(null);
    };

    const handleDrop = (columnId) => {
        if (draggedTask && draggedTask.state !== columnId) {
            const tempTask = { ...draggedTask, state: columnId };

            setDraggedTask(tempTask);
            setCurrentUserTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === draggedTask._id ? tempTask : task))
            );
            editTaskFromApiCall(tempTask);
        }
        setHoveredColumn(null);
        setDraggedTask(null);
        setDraggedTaskId(null); // Reset dragged task ID
    };

    useEffect(() => {
        setCurrentUserTasks(allTasks.filter((task) => task.assignedTo._id === currentUser._id));
    }, [allTasks, currentUser]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 text-black w-full">
            {Object.entries(columnNames).map(([columnId, columnName]) => (
                <div
                    key={columnId}
                    className={`bg-gray-100 bg-opacity-40 rounded-lg p-4 shadow-md 
                        overflow-y-auto ${hoveredColumn === columnId ? 'border-2 border-blue-500' : ''} 
                        hover:scrollbar-visible scrollbar-hidden`}
                    onDragEnter={() => handleDragEnter(columnId)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={() => handleDrop(columnId)}
                >
                    <h2 className="text-lg font-semibold mb-3 text-center">{columnName}</h2>
                    <div className="space-y-4">
                        {currentUserTasks
                            .filter((task) => task.state === columnId)
                            .map((task) => (
                                <Taskcard
                                    key={task._id}
                                    task={task}
                                    onDragStart={() => handleDragStart(task)}
                                    isDragging={draggedTaskId === task._id}
                                />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Taskboard;