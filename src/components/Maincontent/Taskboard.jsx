import React, { useState } from 'react';
import Taskcard from './Taskcard';

// Utility function to generate unique task IDs
const generateTaskId = () => Math.floor(Math.random() * 100000).toString();

// Initial array of tasks
const initialTasks = [
    { id: generateTaskId(), title: 'Task 1', description: 'This is a task in todos', state: 'failed' },
    { id: generateTaskId(), title: 'Task 2', description: 'This is another task in todos', state: 'failed' },
    { id: generateTaskId(), title: 'Task 3', description: 'This task is in progress', state: 'failed' },
    { id: generateTaskId(), title: 'Task 4', description: 'This is another task in progress', state: 'failed' },
    { id: generateTaskId(), title: 'Task 5', description: 'This task is completed', state: 'done' },
    { id: generateTaskId(), title: 'Task 6', description: 'This task has failed', state: 'failed' },
    { id: generateTaskId(), title: 'Task 6', description: 'This task has failed', state: 'failed' },
    { id: generateTaskId(), title: 'Task 6', description: 'This task has failed', state: 'failed' },
    { id: generateTaskId(), title: 'Task 6', description: 'This task has failed', state: 'failed' },
];

const Taskboard = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [draggedTask, setDraggedTask] = useState(null);
    const [hoveredColumn, setHoveredColumn] = useState(null);

    const columnNames = {
        todos: 'To Do',
        inProgress: 'In Progress',
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
