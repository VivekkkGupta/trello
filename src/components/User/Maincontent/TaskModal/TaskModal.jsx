import React, { useState } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import default_avatar from "../../../../assets/images/default_avatar.jpg";

const TaskModal = ({ taskfromparent, onClose, updateTaskStateAndAssignee }) => {
  const { formatTimestamp } = useAuthContext();
  const { usersList } = useAuthContext();
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(taskfromparent.notes || []);
  const [newState, setNewState] = useState(taskfromparent.state);
  const [newAssignee, setNewAssignee] = useState(
    taskfromparent.assignedTo?._id || ""
  );

  // Add a new note (comment)
  const handleAddComment = () => {
    if (newNote.trim()) {
      const updatedNotes = [
        ...notes,
        `Comment: ${newNote} on ${new Date().toLocaleString()}`,
      ];
      setNotes(updatedNotes);
      setNewNote("");
    }
  };

  // Handle state or assignee change
  const handleUpdateTask = async () => {
    if (
      newState !== taskfromparent.state ||
      newAssignee !== taskfromparent.assignedTo?._id
    ) {
      const note = `Task ${
        newState !== taskfromparent.state
          ? `state changed to '${newState}'`
          : ""
      }${
        newState !== taskfromparent.state &&
        newAssignee !== taskfromparent.assignedTo?._id
          ? " and "
          : ""
      }${
        newAssignee !== taskfromparent.assignedTo?._id
          ? `assigned to '${
              usersList.find((u) => u._id === newAssignee)?.username
            }'`
          : ""
      } on ${new Date().toLocaleString()}`;

      const updatedTask = await updateTaskStateAndAssignee(
        taskfromparent._id,
        { state: newState, assignedTo: newAssignee },
        note
      );

      if (updatedTask) {
        setNotes([...notes, note]);
      }
    }
  };

  return (
    <div className="fixed inset-0 -top-4 backdrop-blur-sm z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl shadow-lg tracking-wide flex">
        {/* Left Section */}
        <div className="flex-1 pr-4 border-r border-gray-300">
          {/* Task Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-semibold text-gray-600">
              # {taskfromparent._id}
            </h2>
          </div>

          {/* Task Details */}
          <div>
            <h3 className="text-4xl font-bold text-gray-900">
              {taskfromparent.title}
            </h3>
            <p className="mt-1 text-md text-gray-600">
              Description: {taskfromparent.description}
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Created On:{" "}
              {new Date(taskfromparent.createdDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Due Date: {new Date(taskfromparent.dueDate).toLocaleDateString()}
            </p>
            <p
              className={`text-sm font-medium ${
                new Date() > new Date(taskfromparent.dueDate)
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {new Date() > new Date(taskfromparent.dueDate)
                ? "Overdue"
                : "Underdue"}
            </p>

            {/* State Dropdown */}
            <div className="mt-4 flex">
              <label className="text-sm font-medium text-gray-700">
                State:
              </label>
              <select
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
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
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
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
              <h3 className="text-lg font-semibold text-gray-800">Add Note:</h3>
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
                placeholder="Add a Note..."
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

          {/* Notes Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Activities
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 overflow-y-auto max-h-64 border-t border-gray-200 pt-2">
              {taskfromparent.notes.map((note, index) => (
                <li key={index}>
                  <div className="flex gap-5 border-b-2 border-t-2 min-h-6 min-w-6">
                    <img
                      src={note.avatar || default_avatar}
                      className="w-6 h-6 items-center border border-gray-900 rounded-full"
                      alt="user avatar"
                      srcset=""
                    />
                    <p className="">{note.text}</p>
                  </div>
                  <br />
                  Performed on : <b>{formatTimestamp(note.timestamp)}</b>
                  <br />
                  By <b>{note.userDetails.username}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
