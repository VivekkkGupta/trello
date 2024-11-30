import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

function CreateTaskModal({ show, onClose }) {
    const { getAllUsersApiCall, createTaskFromApiCall, fetchTasksData, currentUser } = useAuthContext();

    const [dueDateInput, setDueDateInput] = useState('');
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        dueDate: '',
        createdDate: '',
        dueStatus: {},
        assignedTo: 'unassigned',
        state: 'Todos',
        assignedToObj: {},
    });


    const [usersList, setUsersList] = useState([]);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            if (show) {
                const response = await getAllUsersApiCall();
                setUsersList(response.length > 0 ? response : []);
            }
        };
        fetchUsers();
    }, [show]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dueDate') {
            const readableDate = new Date(value).toString(); // Human-readable format
            setTaskData((prevData) => ({ ...prevData, [name]: readableDate })); // Save readable format
            setDueDateInput(value); // Save ISO format for input display
        } else if (name === 'assignedTo') {
            const selectedUser = value !== 'unassigned' ? usersList.find((user) => user._id === value) : {};
            setTaskData((prevData) => ({
                ...prevData,
                [name]: value,
                assignedToObj: selectedUser || {},
            }));
        } else {
            setTaskData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSave = async () => {
        const { title, description, dueDate } = taskData;

        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Task title is required.';
        if (!description.trim()) newErrors.description = 'Task description is required.';
        if (!dueDate) newErrors.dueDate = 'Due date is required.';

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            setMessage({ text: 'Please fill in all required fields.', type: 'error' });
            return;
        }

        try {
            const newTask = {
                ...taskData,
                createdDate: new Date().toString(),
                notes: [
                    {
                        userDetails: currentUser,
                        text: `Task created by ${currentUser.username}`,
                        noteId: Date.now(),
                        avatar: currentUser.avatar,
                        timestamp: new Date(),
                        type: 'Note',
                        isComment: false,
                    },
                ],
            };

            // console.log(newTask)
            const result = await createTaskFromApiCall(newTask);
            setMessage({ text: `Task Created successfully with ID: ${result._id}`, type: 'success' });
            fetchTasksData(); // Refresh task data
            clearModalStates();
        } catch (error) {
            console.error('Error in handleSave:', error);
            setMessage({ text: 'Failed to create task.', type: 'error' });
        }
    };

    const clearModalStates = () => {
        setTaskData({
            title: '',
            description: '',
            dueDate: '',
            createdDate: '',
            dueStatus: {},
            assignedTo: 'unassigned',
            state: 'Todos',
            assignedToObj: {},
        });
        setDueDateInput('')
        setErrors({});
    };

    const handleCancel = () => {
        clearModalStates();
        setMessage({ text: '', type: '' });
        onClose();
    };

    const closeMessageBox = () => {
        setMessage({ text: '', type: '' });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleCancel}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-black" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl mb-4 font-medium text-center">Create Task</h2>

                {/* Message Box */}
                {message.text && (
                    <div
                        className={`flex items-center justify-between p-3 mb-4 rounded-md text-white ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                            }`}
                    >
                        <span>{message.text}</span>
                        <button onClick={closeMessageBox} className="text-xl font-bold ml-4">
                            ×
                        </button>
                    </div>
                )}

                <label className="block mt-2">Title:</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={taskData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-gray-800"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

                <label className="block mt-2">Description:</label>
                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={taskData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-gray-800"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                <label className="block mt-2">Due Date:</label>
                <input
                    type="datetime-local"
                    name="dueDate"
                    value={dueDateInput}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-gray-800"
                />
                {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}

                <label className="block mt-2">Assign To:</label>
                <select
                    name="assignedTo"
                    value={taskData.assignedTo}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded text-gray-800"
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
