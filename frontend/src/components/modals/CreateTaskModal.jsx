import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

function CreateTaskModal({ show, onClose, onSave }) {
    const { getAllUsersApiCall } = useAuthContext();

    // Single object for task data
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        dueDate: '',
        assignedTo: 'unassigned',
        assignedToObj: {}
    });

    const [usersList, setUsersList] = useState([]);
    const [errors, setErrors] = useState({});

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
        const userObj = usersList.find(user => user._id === taskData.assignedTo);
        setTaskData(prevData => ({ ...prevData, assignedToObj: userObj || {} }));
    }, [taskData.assignedTo, usersList]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prevData => ({ ...prevData, [name]: value }));
        // Remove error for the field when it has value
        if (value.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleSave = () => {
        const { title, description, dueDate } = taskData;
        const newErrors = {};

        if (!title.trim()) newErrors.title = 'Task title is required.';
        if (!description.trim()) newErrors.description = 'Task description is required.';
        if (!dueDate) newErrors.dueDate = 'Due date is required.';

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        onSave(taskData);
        clearModalStates();
    };

    const clearModalStates = () => {
        setTaskData({
            title: '',
            description: '',
            dueDate: '',
            assignedTo: 'unassigned',
            assignedToObj: {}
        });
        setErrors({});
    };

    const handleCancel = () => {
        clearModalStates();
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-black">
                <h2 className="text-2xl mb-4">Create Task</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={taskData.title}
                    onChange={handleChange}
                    className="w-full mb-1 p-2 border border-gray-300 rounded"
                />
                {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title}</p>}
                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={taskData.description}
                    onChange={handleChange}
                    className="w-full mb-1 p-2 border border-gray-300 rounded"
                />
                {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}
                <input
                    type="date"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                    className="w-full mb-1 p-2 border border-gray-300 rounded"
                />
                {errors.dueDate && <p className="text-red-500 text-sm mb-2">{errors.dueDate}</p>}
                <select
                    name="assignedTo"
                    value={taskData.assignedTo}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                >
                    <option value="unassigned">Unassigned</option>
                    {usersList.map(user => (
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
