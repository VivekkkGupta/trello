import React, { useState } from "react";
import { useTrelloContext } from "../../../contexts/TrelloContext";
import { useAuthContext } from "../../../contexts/AuthContext";
import default_avatar from "../../../assets/images/default_avatar.jpg";
import ShowTaskRightPanel from "./ShowTaskRightPanel";
import ShowNotesInShowTask from "./ShowNotesInShowTask";

function ShowTask() {
  const { isRightSidebarOpen, statusColors } = useTrelloContext();
  const {
    usersList,
    currentUser,
    currentTask,
    setCurrentTask,
    newComment,
    setNewComment,
    editTaskFromApiCall,
    updateTask,
    formatTimestamp,
    handleAddComment,
  } = useAuthContext();

  return (
    <div className={`${isRightSidebarOpen ? "w-[calc(100%-20rem)]" : "w-full"} h-full flex items-center justify-center duration-200 transition-all`}>
      {currentTask && (
        <div className="w-[95%] h-[95%] flex items-center justify-center bg-white bg-opacity-50 rounded-lg relative">
          <span onClick={() => setCurrentTask(null)} className="absolute right-4 top-4 cursor-pointer">
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

              <ShowNotesInShowTask />

            </div>

            <ShowTaskRightPanel />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowTask;
