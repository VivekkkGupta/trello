import React, { useState } from "react";
import { useTrelloContext } from "../../contexts/TrelloContext";
import { useAuthContext } from "../../contexts/AuthContext";
import default_avatar from "../../assets/images/default_avatar.jpg";

function ShowTask() {
  const [newNote, setNewNote] = useState("");
  const [newComment, setNewComment] = useState("");

  const {
    isRightSidebarOpen,
    handleCurrentTaskInAdminDashboard,
    currentTask,
    setCurrentTask,
    statusColors,
  } = useTrelloContext();

  const { usersList, currentUser, editTaskFromApiCall, updateTask, formatTimestamp } = useAuthContext();

  const addNote = (text, isComment = false) => {
    const updatedTask = {
      ...currentTask,
      notes: [
        ...currentTask.notes,
        {
          userDetails: currentUser,
          noteId: Date.now(), // Unique note ID
          text,
          timestamp: new Date(),
          isComment, // Flag to distinguish between notes and comments
        },
      ],
    };
    return updatedTask;
  };

  const handleUserChange = async (e) => {
    const newAssignedUserId = e.target.value;
    const newAssignedUserObj = usersList.find((user) => user._id === newAssignedUserId);

    if (!newAssignedUserObj) return;

    try {
      const resultTask = await editTaskFromApiCall({
        ...currentTask,
        assignedTo: newAssignedUserObj,
        notes: [
          ...currentTask.notes,
          {
            userDetails: currentUser,
            noteId: Date.now(),
            text: `Task reassigned to ${newAssignedUserObj.username} by ${currentUser.username}`,
            timestamp: new Date(),
            isComment: false,
          },
        ],
      });
      setCurrentTask(resultTask);
      updateTask(resultTask); // Update the tasks list in the parent context
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleStateChange = async (e) => {
    const newState = e.target.value;

    try {
      const resultTask = await editTaskFromApiCall({
        ...currentTask,
        state: newState,
        notes: [
          ...currentTask.notes,
          {
            userDetails: currentUser,
            noteId: Date.now(),
            text: `Task status changed to ${newState} by ${currentUser.username}`,
            timestamp: new Date(),
            isComment: false,
          },
        ],
      });
      setCurrentTask(resultTask);
      updateTask(resultTask); // Update the tasks list in the parent context
    } catch (error) {
      console.error("Error updating task state:", error);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedTask = addNote(newNote.trim());
      setCurrentTask(updatedTask);
      setNewNote("");
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedTask = addNote(newComment.trim(), true);
      setCurrentTask(updatedTask);
      setNewComment("");
    }
  };

  return (
    <div className={`${isRightSidebarOpen ? "w-[calc(100%-20rem)]" : "w-full"} h-full flex items-center justify-center duration-200 transition-all`}>
      {currentTask && (
        <div className="w-[90%] h-[90%] flex items-center justify-center bg-white bg-opacity-50 rounded-lg relative">
          <span onClick={() => handleCurrentTaskInAdminDashboard(null)} className="absolute right-4 top-4 cursor-pointer">
            <i className="ri-close-line text-3xl"></i>
          </span>

          <div className="flex justify-between p-5 w-full h-full text-gray-800">
            <div className="bg-gray-100 w-[70%] rounded-lg p-8 scrollbar-hidden overflow-y-auto h-full">
              <h5 className="flex justify-end"># {currentTask._id}</h5>
              <h2 className="font-[900] text-4xl">{currentTask.title}</h2>
              <p className="mt-4 w-full bg-gray-200 rounded-lg p-3">
                <span className="font-[500] inline">Description: </span> {currentTask.description}
              </p>

              <div className="mt-6 bg-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between gap-2 h-10">
                  <img src={currentUser.avatar || default_avatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
                  <input
                    type="text"
                    className="w-4/6 p-2 rounded border-gray-300 outline-0 border-0"
                    placeholder="Add a note..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button onClick={handleAddComment} className="w-2/6 h-10 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Add Note
                  </button>
                </div>
              </div>

              <div className="mt-4 bg-gray-200 rounded-lg p-4 h-full custom-scrollbar overflow-y-auto">
                <h3 className="font-semibold text-xl mb-4">Notes & Comments</h3>
                <div className="space-y-4">
                  {currentTask.notes?.map((note) => (
                    <div key={note.noteId} className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
                      <img src={default_avatar} alt={`${note.userDetails.username}'s avatar`} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <p className="font-medium">{note.userDetails.username} {note.isComment ? "(Comment)" : "(Note)"}</p>
                        <p className="text-sm text-gray-700">{note.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTimestamp(note.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="bg-gray-100 w-[28%] h-[95%] rounded-lg flex self-end text-sm overflow-y-auto">
              <div className="w-full p-3 flex flex-col gap-3">
                <div className="w-full bg-gray-200 rounded-lg px-3 py-2">
                  <label className="font-[500] inline">State : </label>
                  <select className="ml-2 p-2 rounded bg-white" value={currentTask.state || ""} onChange={handleStateChange}>
                    <option value="Todos">Todos</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

                <div className="w-full bg-gray-200 rounded-lg px-3 py-2">
                  <label className="font-[500] inline">Assigned : </label>
                  <select className="ml-2 p-2 rounded bg-white" value={currentTask.assignedTo?._id || ""} onChange={handleUserChange}>
                    {usersList.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowTask;
