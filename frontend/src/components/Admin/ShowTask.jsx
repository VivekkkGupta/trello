import React, { useState, useEffect } from "react";
import { useTrelloContext } from "../../contexts/TrelloContext";
import { useAuthContext } from "../../contexts/AuthContext"; // Import the AuthContext to access user data
import default_avatar from "../../assets/images/default_avatar.jpg";

function ShowTask() {
  const [newNote, setNewNote] = useState(""); // State to handle new note input

  const {
    isRightSidebarOpen,
    handleCurrentTaskInAdminDashboard,
    currentTask,
    setCurrentTask,
    statusColors
  } = useTrelloContext();

  const { usersList, fetchUsersData, currentUser, editTaskFromApiCall, updateTask } = useAuthContext(); // Get all users and the logged-in user

  // Handle the change in assigned user
  const handleUserChange = async (e) => {
    const newAssignedUserId = e.target.value;
    const newAssignedUserObj = usersList.find((user) => user._id === newAssignedUserId);

    // Ensure currentTask is being updated correctly
    const newObjOfTask = {
      ...currentTask,
      assignedTo: { _id: newAssignedUserId, ...newAssignedUserObj }, // This assumes assignedTo is an object
    };

    try {
      const resultTask = await editTaskFromApiCall(newObjOfTask);
      setCurrentTask(resultTask);
      updateTask(resultTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  // Handle new note submission
  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedTask = {
        ...currentTask,
        notes: [
          ...currentTask.notes,
          {
            userDetails: currentUser,
            noteId: 3,
            text: newNote.trim(),
            timestamp: new Date(),
          },
        ],
      };

      console.log(currentTask);
    }
  };

  // Handle state change
  const handleStateChange = async (e) => {
    const newState = e.target.value;
    const updatedTask = { ...currentTask, state: newState };

    try {
      const resultTask = await editTaskFromApiCall(updatedTask);
      setCurrentTask(resultTask);
      updateTask(resultTask);
    } catch (error) {
      console.error("Error updating task state:", error);
    }
  };

  return (
    <div
      className={`${isRightSidebarOpen ? "w-[calc(100%-20rem)]" : "w-full"
        } h-full flex items-center justify-center duration-200 transition-all`}
    >
      {currentTask && (
        <div className={`w-[90%] h-[90%] flex items-center justify-center bg-opacity-90 ${statusColors[currentTask.state].bg} rounded-lg relative`}>
          <span
            onClick={() => handleCurrentTaskInAdminDashboard(null)}
            className="absolute right-4 top-4 cursor-pointer"
          >
            <i className="ri-close-line text-3xl"></i>
          </span>

          <div className="flex justify-between p-5 w-full h-full text-gray-800">
            <div className="bg-gray-100 w-[70%] rounded-lg p-8">
              <h5 className="flex justify-end"># {currentTask._id}</h5>
              <h2 className="font-[900] text-4xl">{currentTask.title}</h2>
              <p className="mt-4 w-full bg-gray-200 rounded-lg p-3">
                <span className="font-[500] inline">Description : </span>{" "}
                {currentTask.description}
              </p>

              {/* Notes Section */}
              <div className="mt-6 bg-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between gap-2 h-10 ">
                  <img
                    src={currentUser.avatar === null ? default_avatar : currentUser.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <input
                    type="text"
                    className="w-4/6 p-2 rounded border-gray-300 outline-0 border-0"
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <button
                    onClick={handleAddNote}
                    className="w-2/6 h-10 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              <div className="mt-4 bg-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-xl mb-4">Notes</h3>
                <div className="space-y-4">
                  {currentTask.notes?.map((note, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg"
                    >
                      <img
                        src={default_avatar}
                        alt={`${note.username}'s avatar`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium">{note.userDetails.username}</p>
                        <p className="text-sm text-gray-700">{note.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 w-[28%] h-[95%] rounded-lg flex self-end text-sm">
              <div className="w-full p-3 flex flex-col gap-3">
                {/* Task State Dropdown */}
                <div className="w-full bg-gray-200 rounded-lg px-3 py-2">
                  <label className="font-[500] inline">State : </label>
                  <select
                    className="ml-2 p-2 rounded bg-white"
                    value={currentTask.state || ""}
                    onChange={handleStateChange}
                  >
                    <option value="Todos">Todos</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

                {/* Assigned User Dropdown */}
                <div className="w-full bg-gray-200 rounded-lg px-3 py-2">
                  <label className="font-[500] inline">Assigned : </label>

                  <select
                    className="ml-2 p-2 rounded bg-white"
                    value={currentTask.assignedTo?._id || ""} // Ensure you're accessing the _id directly
                    onChange={handleUserChange}
                  >
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
