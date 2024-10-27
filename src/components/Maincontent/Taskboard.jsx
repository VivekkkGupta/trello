import React, { useState } from 'react';
import Taskcard from './Taskcard';

const initialTasks = [
    { id: '1', title: 'Task 1', description: 'This is a completed task', state: 'completed' },
    { id: '2', title: 'Task 2', description: 'This task is on hold', state: 'onHold' },
    { id: '3', title: 'Task 3', description: 'This task failed', state: 'failed' },
    { id: '4', title: 'Task 4', description: 'This task is in progress', state: 'inProgress' },
];

const Taskboard = () => {
    const [tasks] = useState(initialTasks);

    // Columns for different states
    const columns = {
        completed: 'Completed',
        inProgress: 'In Progress',
        onHold: 'On Hold',
        failed: 'Failed',
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 text-black w-full">
            {Object.entries(columns).map(([columnId, columnName]) => (
                <div key={columnId} className="bg-gray-100 bg-opacity-40 rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-3 text-center">{columnName}</h2>
                    <div className="space-y-4">
                        {tasks
                            .filter((task) => task.state === columnId)
                            .map((task) => (
                                <div key={task.id}>
                                    <Taskcard
                                        title={task.title}
                                        description={task.description}
                                        state={task.state}
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
