import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

function CreateTaskModal({ show, onClose, onSave }) {

    const { getAllUsersApiCall } = useAuthContext();

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('unassigned');
    const [assignedToObj, setAssignedToObj] = useState({});
    const [usersList, setUsersList] = useState([]);

    // Fetch users and update the list when modal opens
    const getDataAndSaveInOptions = async () => {
        if (show) {
            const response = await getAllUsersApiCall();
            setUsersList(response.length > 0 ? response : []);
        }
    };

    useEffect(() => {
        getDataAndSaveInOptions();
    }, [show]);

    // Update assignedToObj when assignedTo changes
    useEffect(() => {
        const userObj = usersList.find(user => user._id === assignedTo);
        setAssignedToObj(userObj || {});
    }, [assignedTo, usersList]);

    const handleSave = () => {
        if (!taskTitle.trim()) {
            alert("Task title is required.");
            return;
        }
        if (!taskDescription.trim()) {
            alert("Task description is required.");
            return;
        }
        if (!taskDueDate) {
            alert("Due date is required.");
            return;
        }

        onSave({
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate,
            assignedToObj,
        });

        clearModalStates();
    };

    const clearModalStates = () => {
        setTaskTitle('');
        setTaskDescription('');
        setTaskDueDate('');
        setAssignedTo('unassigned');
        setAssignedToObj({});
    };

    const handleCancel = () => {
        // clearModalStates();
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-black">
                <h2 className="text-2xl mb-4">Create Task</h2>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Task Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                />
                <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                >
                    <option value="unassigned">Unassigned</option>
                    {usersList.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save Task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateTaskModal;
