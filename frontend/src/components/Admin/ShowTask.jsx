import React, { useState } from "react";
import { useTrelloContext } from "../../contexts/TrelloContext";
import { useAuthContext } from "../../contexts/AuthContext";
import default_avatar from "../../assets/images/default_avatar.jpg";
import ShowTaskRightPanel from "./ShowTaskRightPanel";

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
                    <div
                      key={note.noteId}
                      className={`flex items-start gap-4 p-4 rounded-lg ${note.isComment ? "bg-blue-50 text-blue-800" : "bg-green-50 text-green-800"
                        }`}
                    >
                      <img src={default_avatar} alt={`${note.userDetails.username}'s avatar`} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <p className="font-medium">{note.userDetails.username} {note.isComment ? "(Comment)" : "(Note)"}</p>
                        <p className="text-sm">{note.text}</p>
                        <p className="text-xs mt-1 text-gray-500">{formatTimestamp(note.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <ShowTaskRightPanel />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowTask;
