import React, { useState, useEffect, useRef } from 'react';
import Taskcard from './Taskcard';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useTrelloContext } from '../../../contexts/TrelloContext';

const Taskboard = () => {
    const { currentUser, editTaskFromApiCall, currentUserTasks, fetchTasksData, allTasks } = useAuthContext();

    const [taskData, setTaskData] = useState(currentUser.role === "admin" ? allTasks : currentUserTasks);

    const { statusColors } = useTrelloContext()

    const [draggedTask, setDraggedTask] = useState(null);
    const [draggedTaskId, setDraggedTaskId] = useState(null); // Track dragged task's ID
    const [hoveredColumn, setHoveredColumn] = useState(null);

    const [isCommentBox, setCommentBox] = useState(false);
    const [pendingUpdate, setPendingUpdate] = useState(null); // Hold pending update data
    const [newNote, setNewNote] = useState("");

    const columnNames = {
        Todo: 'To Do',
        InProgress: 'In Progress',
        Completed: 'Completed',
        Cancelled: 'Cancelled',
    };

    const addNote = (myTask, text, isComment = false) => {
        const updatedTask = {
            ...myTask,
            notes: [
                ...myTask.notes,
                {
                    userDetails: currentUser,
                    noteId: Date.now(), // Unique note ID
                    text,
                    timestamp: new Date(),
                    type: "comment",
                    isComment, // Flag to distinguish between notes and comments
                },
            ],
        };
        return updatedTask;
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
        // setHoveredColumn(null);  
    };

    const handleDrop = (columnId) => {
        if (draggedTask && draggedTask.state !== columnId) {
            const updatedTask = { ...draggedTask, state: columnId };
            const noteText = `Task state changed from ${draggedTask.state} to ${updatedTask.state}`;

            // Add to pending updates for API persistence
            setPendingUpdate({ updatedTask, noteText });
            setCommentBox(true);
        }
        setHoveredColumn(null);
        setDraggedTask(null);
        setDraggedTaskId(null);
    };

    const handleCancelUpdate = () => {
        setPendingUpdate(null); // Clear pending update
        setCommentBox(false); // Hide confirmation modal
        setHoveredColumn(null);
        setDraggedTask(null);
        setDraggedTaskId(null);
        setNewNote("")
    };

    const handleConfirmUpdate = async () => {
        if (pendingUpdate) {
            const { updatedTask, noteText } = pendingUpdate;

            let updatedWithComment;
            if (newNote.trim()) {
                updatedWithComment = addNote(updatedTask, newNote.trim(), true);
            }

            // Add the note and save the update
            const updatedWithNote = addNote(updatedWithComment, noteText);
            await editTaskFromApiCall(updatedWithNote);

            setTaskData((prevTasks) =>
                prevTasks.map((task) => (task._id === updatedWithNote._id ? updatedWithNote : task))
            );

            // Update state
            // setCurrentTaskInView(updatedWithNote);
            setPendingUpdate(null); // Clear pending update
            setCommentBox(false); // Hide confirmation modal
            setHoveredColumn(null);
            setDraggedTask(null);
            setDraggedTaskId(null);
            setNewNote("")

            // Refresh task data
            await fetchTasksData();
        }
    };

    const inputCommentBoxRef = useRef(null);

    const handleBackgroundClickOnCommentBox = (event) => {
        if (
            inputCommentBoxRef.current &&
            !inputCommentBoxRef.current.contains(event.target)
        ) {
            setCommentBox(false); // Close the modal
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 text-black w-full ">
            {Object.entries(columnNames).map(([columnId, columnName]) => (
                <div
                    key={columnId}
                    className={`bg-gray-100 rounded-lg p-4 shadow-md h-fit max-h-full group 
                        overflow-y-auto ${hoveredColumn === columnId ? 'border-2 border-dashed border-black' : ''} 
                        hover:scrollbar-visible hover:custom-scrollbar scrollbar-hidden`}
                    onDragEnter={() => handleDragEnter(columnId)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={() => handleDrop(columnId)}
                >

                    <h2 className={`text-lg font-semibold mb-3 text-center tracking-wide border-b-2 sticky -top-4 bg-gray-100 ${statusColors[columnId].border}`}>{columnName}</h2>
                    <div className="space-y-4">
                        {taskData?.length > 0 ? (
                            taskData && taskData
                                .filter((task) => task.state === columnId)
                                .map((task) => (
                                    <Taskcard
                                        key={task._id}
                                        task={task}
                                        onDragStart={() => handleDragStart(task)}
                                        isDragging={draggedTaskId === task._id}
                                    />
                                ))
                        ) : (
                            <p className="bg-white shadow-lg text-gray-500 text-center hover:shadow-xl rounded-lg h-10 flex items-center justify-center">No tasks here</p>
                        )}

                    </div>
                </div>
            ))}
            {/* Confirmation Modal */}
            {isCommentBox && (
                <div className="fixed inset-0 -top-4 backdrop-blur-sm z-60 flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackgroundClickOnCommentBox}>
                    <div className="bg-white rounded-md p-6 w-96" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Add Reason
                        </h3>
                        <textarea
                            ref={inputCommentBoxRef}
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full h-[100px] px-3 py-2 border border-gray-300 rounded mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleCancelUpdate}
                                className="w-full px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmUpdate}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Taskboard;
