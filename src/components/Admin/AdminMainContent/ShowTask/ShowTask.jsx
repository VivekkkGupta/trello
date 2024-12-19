import React, { useState, useRef } from "react";
import default_avatar from "../../../../assets/images/default_avatar.jpg";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useTrelloContext } from "../../../../contexts/TrelloContext";

function ShowTask() {
  const { isRightSidebarOpen } = useTrelloContext();
  const {
    usersList,
    currentUser,
    currentTask,
    setCurrentTask,
    editTaskFromApiCall,
    fetchTasksData,
  } = useAuthContext();

  const [newNote, setNewNote] = useState("");
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState(null);

  const addNote = (task, text, isComment = false) => {
    return {
      ...task,
      notes: [
        ...task.notes,
        {
          userDetails: currentUser,
          noteId: Date.now(),
          text,
          timestamp: new Date(),
          type: "comment",
          isComment,
        },
      ],
    };
  };

  const handleAddComment = async () => {
    if (newNote.trim()) {
      const updatedTask = addNote(currentTask, newNote.trim(), true);
      await editTaskFromApiCall(updatedTask);
      setNewNote("");
      await fetchTasksData();
    }
  };

  const handleTaskStateChange = (e) => {
    const { name, value } = e.target;
    let updatedTask;
    let noteText;

    if (name === "assignedTo") {
      const selectedUser = usersList.find((user) => user._id === value);
      updatedTask = {
        ...currentTask,
        assignedTo: selectedUser,
      };
      noteText = `Task assigned to ${selectedUser.username}`;
    } else {
      updatedTask = {
        ...currentTask,
        [name]: value,
      };
      noteText = `Task state changed to ${value}`;
    }

    setPendingUpdate({ updatedTask, noteText });
    setIsCommentBoxVisible(true);
  };

  const confirmUpdate = async () => {
    if (pendingUpdate) {
      const { updatedTask, noteText } = pendingUpdate;
      const updatedWithNote = addNote(updatedTask, noteText);
      await editTaskFromApiCall(updatedWithNote);
      setPendingUpdate(null);
      setIsCommentBoxVisible(false);
      await fetchTasksData();
    }
  };

  const cancelUpdate = () => {
    setPendingUpdate(null);
    setIsCommentBoxVisible(false);
  };

  return (
    <div
      className={`${isRightSidebarOpen ? "w-[calc(100%-20rem)]" : "w-full"
        } p-4 h-full flex items-center justify-center duration-200 transition-all`}
    >
      {currentTask && (
        <div className="w-full max-w-5xl p-6 bg-white text-black rounded-lg shadow-lg relative">
          <button
            onClick={() => setCurrentTask(null)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>

          <div className="flex flex-col gap-4">
            {/* Task Details */}
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold">{currentTask.title}</h3>
              <p className="text-gray-600 mt-2">{currentTask.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Task ID: <span className="font-medium"># {currentTask._id}</span>
              </p>
            </div>

            {/* State and Assignee */}
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <select
                  name="state"
                  value={currentTask.state}
                  onChange={handleTaskStateChange}
                  className="block w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="Todo">To Do</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assign To
                </label>
                <select
                  name="assignedTo"
                  value={currentTask.assignedTo?._id || ""}
                  onChange={handleTaskStateChange}
                  className="block w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
                >
                  {usersList.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Notes</h4>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              ></textarea>
              <button
                onClick={handleAddComment}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Note
              </button>
            </div>
          </div>

          {/* Confirmation Modal */}
          {isCommentBoxVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold">Confirm Update</h3>
                <p className="mt-2 text-gray-700">
                  Are you sure you want to update the task?
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={cancelUpdate}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmUpdate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ShowTask;
