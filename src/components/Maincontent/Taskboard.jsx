import React, { useState } from 'react';
import Taskcard from './Taskcard';
import { useAuthContext } from '../../contexts/AuthContext';

const Taskboard = () => {

    const { currentUser, setCurrentUser } = useAuthContext()

    const [tasks, setTasks] = useState(currentUser["tasks"]);
    const [draggedTask, setDraggedTask] = useState(null);
    const [hoveredColumn, setHoveredColumn] = useState(null);

    const columnNames = {
        todos: 'To Do',
        progress: 'In Progress',
        done: 'Completed',
        failed: 'Failed',
    };

    const handleDragStart = (task) => {
        setDraggedTask(task);
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
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === draggedTask.id ? { ...task, state: columnId } : task
                )
            );
        }
        setHoveredColumn(null);
        setDraggedTask(null);
    };

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
                        {tasks
                            .filter((task) => task.state === columnId)
                            .map((task) => (
                                <div key={task.id}>
                                    <Taskcard
                                        taskid={task.id}
                                        title={task.title}
                                        description={task.description}
                                        state={task.state}
                                        onDragStart={() => handleDragStart(task)}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Taskboard;
