import React, { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import default_avatar from "../../../../assets/images/default_avatar.jpg";
import { useTrelloContext } from "../../../../contexts/TrelloContext";

const TaskModal = ({ taskfromparent, onClose }) => {
    const { formatTimestamp, usersList, currentUser, editTaskFromApiCall, fetchTasksData } = useAuthContext();


    const [currentTaskInView, setCurrentTaskInView] = useState(taskfromparent);
    const [newNote, setNewNote] = useState("");
    const [isShowDetails, setIsShowDetails] = useState(false);
    const [isCommentBox, setCommentBox] = useState(false);
    const [pendingUpdate, setPendingUpdate] = useState(null); // Hold pending update data


    // console.log(currentTaskInView)

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

    // Add a new note (comment)
    const handleAddComment = async () => {
        if (newNote.trim()) {
            const updatedTask = addNote(currentTaskInView, newNote.trim(), true);
            await editTaskFromApiCall(updatedTask)
            setCurrentTaskInView(updatedTask)
            setNewNote("");
            await fetchTasksData()
        }
    };

    const handleTaskStateAndAssignedTo = (e) => {
        const { name, value } = e.target;
        let updatedTask;
        let noteText = "";

        if (name === "assignedTo") {
            const selectedUser = usersList.find((user) => user._id === value);
            if (!selectedUser) {
                console.error("Selected user not found");
                return;
            }
            updatedTask = {
                ...currentTaskInView,
                assignedTo: selectedUser,
            };
            noteText = `Task assigned from ${currentUser.username} to ${selectedUser.username}`;
        } else {
            updatedTask = {
                ...currentTaskInView,
                [name]: value,
            };

            if (name === "state") {
                noteText = `Task state changed from ${currentTaskInView.state} to ${value}`;
            }
        }

        setPendingUpdate({ updatedTask, noteText });
        setCommentBox(true); // Show confirmation modal
    };

    const handleCancelUpdate = () => {
        setPendingUpdate(null); // Clear pending update
        setCommentBox(false); // Hide confirmation modal
    };

    const handleShowHideDetails = () => {
        setIsShowDetails(prevState => !prevState)
    }

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

            // Update state
            setCurrentTaskInView(updatedWithNote);
            setPendingUpdate(null);
            setCommentBox(false);

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
            inputCommentBoxRef.current.focus(); // Focus the input box
            inputCommentBoxRef.current.style.borderColor = 'red'
        }
    };

    return (
        <div className="fixed inset-0 -top-4 backdrop-blur-sm z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-full max-w-5xl shadow-lg tracking-wide flex" onClick={(e) => e.stopPropagation()}>
                {/* Left Section */}
                <div className="max-h-[70vh] overflow-y-scroll custom-scrollbar flex-1 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200 space-y-6">
                    {/* Task Header */}
                    <div className="border-b pb-4">

                        <p className="text-sm text-gray-500">
                            Task ID: <span className="text-gray-800 font-medium"># {currentTaskInView._id}</span>
                        </p>
                    </div>

                    {/* Task Details */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {currentTaskInView.title}
                        </h3>
                        <p className="text-gray-700 leading-6">
                            <span className="font-semibold">Description:</span> {currentTaskInView.description || "No description provided."}
                        </p>
                    </div>

                    {/* Dates and Status */}
                    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 space-y-2">
                        <p className="text-gray-600">
                            <span className="font-medium text-gray-800">Created On:</span>{" "}
                            {new Date(currentTaskInView.createdDate).toLocaleDateString('en-GB')}{" "}
                            at {new Date(currentTaskInView.createdDate).toLocaleTimeString()}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium text-gray-800">Due Date:</span>{" "}
                            {new Date(currentTaskInView.dueDate).toLocaleDateString('en-GB')}{" "}
                            at {new Date(currentTaskInView.dueDate).toLocaleTimeString()}
                        </p>
                        <p
                            className={`font-semibold text-sm ${new Date() > new Date(currentTaskInView.dueDate)
                                ? "text-red-600"
                                : "text-green-600"
                                }`}
                        >
                            {new Date() > new Date(currentTaskInView.dueDate)
                                ? "This task is overdue."
                                : "This task is on track."}
                        </p>
                    </div>

                    {/* State Dropdown */}
                    <div className="bg-white px-4 py-1 rounded-md shadow-sm border border-gray-200 flex items-center gap-4">
                        <label htmlFor="state" className="text-sm font-medium text-gray-800 w-1/3">
                            Current State:
                        </label>
                        <select
                            id="state"
                            name="state"
                            value={currentTaskInView.state}
                            onChange={(e) => handleTaskStateAndAssignedTo(e)}
                            className="block px-4 py-2 rounded-md border-gray-300 text-gray-700 focus:ring focus:ring-indigo-200 w-fit"
                        >
                            <option value="Todo">To Do</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Assignee Dropdown */}
                    <div className="bg-white px-4 py-1 rounded-md shadow-sm border border-gray-200 flex items-center gap-4">
                        <label htmlFor="assignedTo" className="text-sm font-medium text-gray-800 w-1/3">
                            Assign To:
                        </label>
                        <select
                            id="assignedTo"
                            name="assignedTo"
                            value={currentTaskInView.assignedTo?._id || ""}
                            onChange={(e) => handleTaskStateAndAssignedTo(e)}
                            className="block px-4 py-2 rounded-md border-gray-300 text-gray-700 focus:ring focus:ring-indigo-200  w-fit"
                        >
                            {usersList && usersList.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>


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

                {/* Right Section */}
                <div className="flex-1 pl-4 max-h-[70vh]">
                    {/* Add Comment Section */}
                    <div className="mb-4 h-fit">
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
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between border-b border-gray-300 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">Activities</h3>
                            <h4
                                className="text-xs cursor-pointer"
                                onClick={handleShowHideDetails}
                            >
                                {isShowDetails ? "Hide Details" : "Show Details"}
                            </h4>
                        </div>
                        <ul className="space-y-4 text-sm overflow-y-auto max-h-[50vh] mt-2 custom-scrollbar pr-2"
                        >
                            {currentTaskInView.notes
                                .slice()
                                .reverse()
                                .map((note, index) => {
                                    // Only render comments when details are hidden
                                    if (!isShowDetails && !note.isComment) return null;

                                    // Show comments as cards
                                    if (note.isComment) {
                                        return (
                                            <li
                                                key={index}
                                                className="flex items-start bg-blue-100 shadow-sm p-3 rounded-lg"
                                            >
                                                {/* Avatar */}
                                                <img
                                                    src={note.avatar || default_avatar}
                                                    className="w-10 h-10 border border-gray-300 rounded-full object-cover"
                                                    alt="user avatar"
                                                />
                                                {/* Note Details */}
                                                <div className="ml-4">
                                                    <p className="text-gray-800 font-medium">{note.text}</p>
                                                    <div className="mt-2 text-xs text-gray-500">
                                                        <p>
                                                            <span className="font-semibold">Performed on:</span>{" "}
                                                            {formatTimestamp(note.timestamp)}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">Performed by:</span>{" "}
                                                            {note.userDetails?.username || "Unknown"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    }

                                    // Show notes as logs
                                    return (
                                        <li key={index} className="text-gray-600 text-xs ml-5">
                                            <p className="flex flex-col">
                                                Note: {note.text}
                                                <span className="">Performed on: {formatTimestamp(note.timestamp)}</span>{" "}
                                            </p>
                                        </li>
                                    );
                                })}

                            {!isShowDetails &&
                                currentTaskInView.notes.every((note) => !note.isComment) && (
                                    <p className="text-gray-500 text-center">No comments yet</p>
                                )}
                        </ul>

                    </div>



                </div>
            </div>
        </div >
    );
};

export default TaskModal;
