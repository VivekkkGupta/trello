import React, { useState } from "react";
import { useTrelloContext } from "../../contexts/TrelloContext";
import { useAuthContext } from "../../contexts/AuthContext"; // Import the AuthContext to access user data

function Createtask() {
  const {
    isRightSidebarOpen,
    toggleRightSidebar,
    handleCurrentTaskInAdminDashboard,
    currentTask,
    setCurrentTask,
    updateTaskData,
  } = useTrelloContext();

  const { UserData, loggedInUser } = useAuthContext(); // Get all users and the logged-in user

  // Ensure currentTask is defined before accessing its properties
  if (!currentTask) {
    return <div>Loading...</div>; // or show a suitable message or fallback UI
  }

  // Find the user assigned to the task
  const currentUser = UserData.find((user) => user.username === currentTask.assignedTo);

  // Fallback if assignedTo is null or not found
  const currentUserAvatar = currentUser?.avatar || "/default-avatar.png";
  const currentUserName = currentUser?.username || "Unassigned";

  const [newNote, setNewNote] = useState(""); // State to handle new note input

  // Handle the change in assigned user
  const handleUserChange = (e) => {
    const newAssignedUser = e.target.value;

    // Update TaskData with the new assigned user
    const updatedTask = { ...currentTask, assignedTo: newAssignedUser };
    updateTaskData(currentTask.id, updatedTask);

    // Update the currentTask in state to reflect the change in the UI
    setCurrentTask(updatedTask);
  };

  // Handle new note submission
  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedTask = {
        ...currentTask,
        notes: [
          ...currentTask.notes,
          { username: loggedInUser.username, text: newNote, avatar: loggedInUser.avatar }, // Use logged-in user for note submission
        ],
      };

      // Update TaskData with the new note
      updateTaskData(currentTask.id, updatedTask);
      setCurrentTask(updatedTask); // Update the task in state
      setNewNote(""); // Clear the input field
    }
  };

  return (
    <div
      className={`${isRightSidebarOpen ? "w-[calc(100%-20rem)]" : "w-full"
        } h-full flex items-center justify-center duration-200 transition-all`}
    >
      {currentTask && (
        <div className="w-[90%] h-[90%] flex items-center justify-center bg-white bg-opacity-50 rounded-lg relative">
          <span
            onClick={() => handleCurrentTaskInAdminDashboard(null)}
            className="absolute right-4 top-4 cursor-pointer"
          >
            <i className="ri-close-line text-3xl"></i>
          </span>

          <div className="flex justify-between p-5 w-full h-full text-gray-800">
            <div className="bg-gray-100 w-[70%] rounded-lg p-8">
              <h5 className="flex justify-end"># {currentTask.id}</h5>
              <h2 className="font-[900] text-4xl">{currentTask.title}</h2>
              <p className="mt-4 w-full bg-gray-200 rounded-lg p-3">
                <span className="font-[500] inline">Description : </span>{" "}
                {currentTask.description}
              </p>

              {/* Notes Section - Styled like the description */}
              <div className="mt-6 bg-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-xl mb-4">Notes</h3>
                {/* Display previous notes */}
                <div className="space-y-4">
                  {currentTask.notes?.map((note, index) => (
                    <div key={index} className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
                      <img
                        src={note.avatar}
                        alt={`${note.username}'s avatar`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium">{note.username}</p>
                        <p className="text-sm text-gray-700">{note.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input for new note */}
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={loggedInUser?.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <input
                    type="text"
                    className="w-full p-2 rounded border-2 border-gray-300"
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <button
                    onClick={handleAddNote}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 w-[28%] h-[95%] rounded-lg flex self-end text-sm">
              <div className="w-full p-3 flex flex-col gap-2">
                <p className="w-full bg-gray-200 rounded-lg p-3">
                  <span className="font-[500] inline">State : </span> {currentTask.state}
                </p>

                <div className="w-full bg-gray-200 rounded-lg p-3">
                  <label className="font-[500] inline">Assigned : </label>
                  <select
                    className="ml-2 p-2 rounded bg-white"
                    value={currentTask.assignedTo}
                    onChange={handleUserChange}
                  >
                    {UserData.map((user) => (
                      <option key={user.id} value={user.username}>
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

export default Createtask;
