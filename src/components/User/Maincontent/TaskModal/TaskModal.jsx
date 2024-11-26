import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import default_avatar from "../../../../assets/images/default_avatar.jpg";

const TaskModal = ({ taskfromparent, onClose }) => {
    const { formatTimestamp, usersList, currentUser, editTaskFromApiCall, fetchTasksData } = useAuthContext();

    const [currentTaskInView, setCurrentTaskInView] = useState(taskfromparent)
    const [newNote, setNewNote] = useState("");


    const addNote = (text, isComment = false) => {
        const updatedTask = {
            ...currentTaskInView,
            notes: [
                ...currentTaskInView.notes,
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

    // Add a new note (comment)
    const handleAddComment = async () => {
        if (newNote.trim()) {
            const updatedTask = addNote(newNote.trim(), true);
            await editTaskFromApiCall(updatedTask)
            setCurrentTaskInView(updatedTask)
            setNewNote("");
            await fetchTasksData()
        }
    };

    const handleTaskStateAndAssignedTo = async (e) => {
        const { name, value } = e.target;
        const updatedTask = {
            ...currentTaskInView,
            [name]: value,
        };

        // Update local state immediately to prevent UI lag
        setCurrentTaskInView(updatedTask);

        // Save the update to the backend
        await editTaskFromApiCall(updatedTask);

        // Fetch latest data for consistency
        await fetchTasksData();
    };


    return (
        <div className="fixed inset-0 -top-4 backdrop-blur-sm z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-5xl shadow-lg tracking-wide flex">
                {/* Left Section */}
                <div className="flex-1 pr-4 border-r border-gray-300">
                    {/* Task Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xs font-semibold text-gray-600">
                            # {currentTaskInView._id}
                        </h2>
                    </div>

                    {/* Task Details */}
                    <div>
                        <h3 className="text-4xl font-bold text-gray-900">
                            {currentTaskInView.title}
                        </h3>
                        <p className="mt-1 text-md text-gray-600">
                            Description: {currentTaskInView.description}
                        </p>

                        <div className="mt-4 dataoverdue text-xs text-gray-600">
                            <p className="  ">
                                Created On:{" "}
                                {new Date(currentTaskInView.createdDate).toLocaleDateString()}
                            </p>
                            <p className="">
                                Due Date: {new Date(currentTaskInView.dueDate).toLocaleDateString()}
                            </p>
                            <p
                                className={`text-sm font-medium ${new Date() > new Date(currentTaskInView.dueDate)
                                    ? "text-red-500"
                                    : "text-green-500"
                                    }`}
                            >
                                {new Date() > new Date(currentTaskInView.dueDate)
                                    ? "Overdue"
                                    : "Underdue"}
                            </p>
                        </div>

                        {/* State Dropdown */}
                        <div className="mt-4 flex">
                            <label className="text-sm font-medium text-gray-700">
                                State:
                            </label>
                            <select
                                name="state"
                                value={currentTaskInView.state}
                                onChange={(e) => handleTaskStateAndAssignedTo(e)}
                                className="inline border-0 border-gray-300 rounded ml-4"
                            >
                                <option value="Todos">Todos</option>
                                <option value="InProgress">In Progress</option>
                                <option value="Done">Done</option>
                                <option value="Failed">Failed</option>
                            </select>
                        </div>

                        {/* Assignee Dropdown */}
                        <div className="mt-2 flex">
                            <label className="text-sm font-medium text-gray-700">
                                Assign To:
                            </label>
                            <select
                                name="assignedTo"
                                value={currentTaskInView.assignedTo}
                                onChange={(e) => handleTaskStateAndAssignedTo(e)}
                                className="inline border-0 border-gray-300 rounded ml-4"
                            >
                                <option value="">Unassigned</option>
                                {usersList &&
                                    usersList.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.username}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1 pl-4">
                    {/* Add Comment Section */}
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Add Comment:</h3>
                            <button
                                onClick={onClose}
                                className="text-xl text-gray-500 hover:text-gray-700 transition -mt-5"
                            >
                                ✖
                            </button>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <input
                                type="text"
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Add a Comment..."
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                            />
                            <button
                                onClick={handleAddComment}
                                className="bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Activities
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600 overflow-y-auto max-h-64 border-t border-gray-200 pt-2">
                            {currentTaskInView.notes.map((note, index) => (
                                <li key={index} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-5 min-h-5 min-w-5 ">
                                        <img
                                            src={note.avatar || default_avatar}
                                            className="w-6 h-6 items-center border border-gray-500 rounded-full"
                                            alt="user avatar"
                                        />
                                        <p className="text-gray-800">{note.text}</p>
                                    </div>
                                    <div className="text-gray-500 text-xs">

                                        Performed on : <b>{formatTimestamp(note.timestamp)}</b>
                                        <br />
                                        By <b>{note.userDetails.username}</b>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TaskModal;
