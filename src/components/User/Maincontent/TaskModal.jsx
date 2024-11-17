import React, { useState } from 'react';

const TaskModal = ({ task, onClose }) => {
    const [comments, setComments] = useState(task.comments || []); // Initial comments
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            const updatedComments = [...comments, { text: newComment, date: new Date() }];
            setComments(updatedComments);
            setNewComment('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Task Details: #{task.id} {task.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        ✖
                    </button>
                </div>

                {/* Task Details */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">Description: {task.description}</p>
                    <p className="text-sm text-gray-600">Assigned to: {task.assignedTo.username}</p>
                    <p className="text-sm text-gray-600">
                        Due Date: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                        Status:{' '}
                        <span
                            className={`font-semibold ${task.state === 'Todos'
                                ? 'text-blue-500'
                                : task.state === 'InProgress'
                                    ? 'text-yellow-500'
                                    : task.state === 'Done'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }`}
                        >
                            {task.state}
                        </span>
                    </p>
                </div>


                {/* Comments */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Comments:</h3>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                        {comments.map((comment, index) => (
                            <li key={index}>
                                <span className="font-medium">{comment.text}</span>{' '}
                                <span className="text-xs text-gray-500">
                                    ({new Date(comment.date).toLocaleString()})
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleAddComment}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Notes */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Notes:</h3>
                    <ul className="list-disc pl-4 text-sm text-gray-600">
                        {/* {task.notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))} */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
