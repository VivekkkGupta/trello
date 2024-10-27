import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Taskcard from './Taskcard';

const initialTasks = [
    { id: '1', title: 'Task 1', description: 'This is a completed task', state: 'completed' },
    { id: '2', title: 'Task 2', description: 'This task is on hold', state: 'onHold' },
    { id: '3', title: 'Task 3', description: 'This task failed', state: 'failed' },
    { id: '4', title: 'Task 4', description: 'This task is in progress', state: 'inProgress' },
];

const Taskboard = () => {
    const [tasks, setTasks] = useState(initialTasks);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // If no destination, return
        if (!destination) return;

        // If the task was dropped in the same column and position, return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Update the task state based on the destination column
        const updatedTasks = tasks.map((task) =>
            task.id === draggableId ? { ...task, state: destination.droppableId } : task
        );

        setTasks(updatedTasks);
    };

    // Columns for different states
    const columns = {
        completed: 'Completed',
        inProgress: 'In Progress',
        onHold: 'On Hold',
        failed: 'Failed',
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 text-black">
                {Object.entries(columns).map(([columnId, columnName]) => (
                    <Droppable key={columnId} droppableId={columnId}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="bg-gray-100 bg-opacity-40 rounded-lg p-4 shadow-md"
                            >
                                <h2 className="text-lg font-semibold mb-3 text-center">{columnName}</h2>
                                <div className="space-y-4">
                                    {tasks
                                        .filter((task) => task.state === columnId)
                                        .map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Taskcard
                                                            title={task.title}
                                                            description={task.description}
                                                            state={task.state}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default Taskboard;
