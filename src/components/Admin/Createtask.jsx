import React from "react";
import { useTrelloContext } from "../../contexts/TrelloContext";

function Createtask() {
  const {
    isRightSidebarOpen,
    toggleRightSidebar,
    handleCurrentTaskInAdminDashboard,
    currentTask,
    setCurrentTask,
  } = useTrelloContext();

  return (
    <div
      className={`${
        isRightSidebarOpen ? "w-[calc(100%-20rem)]" : "w-full"
      } h-full flex items-center justify-center duration-200 transition-all`}
    >
        {currentTask && (
      <div className="w-[90%] h-[90%] flex items-center justify-center bg-white bg-opacity-50  rounded-lg relative">
        <span onClick={()=>handleCurrentTaskInAdminDashboard(null)} className="absolute right-4 top-4 cursor-pointer">
          <i className="ri-close-line text-3xl"></i>
        </span>
        
          <div className="flex justify-between p-5 w-full h-full text-gray-800">
            <div className="bg-gray-100 w-[70%] rounded-lg p-8">
                
                <h5 className="flex justify-end">
                    # {currentTask.id}
                    </h5>
                <h2 className="font-[900] text-4xl">
                    {currentTask.title}
                </h2>
                <p className="mt-4 w-full bg-gray-200 rounded-lg p-3">
                    <p className="font-[500] inline">Description : </p> {currentTask.description}
                </p>
                
            </div>
            <div className="bg-gray-100 w-[28%] h-[95%] rounded-lg flex self-end text-sm">
                <div className="w-full p-3 flex flex-col gap-2">
                    <p className="w-full bg-gray-200 rounded-lg p-3">
                        <p className="font-[500] inline">State : </p> {currentTask.state}
                    </p>
                    <p className="w-full bg-gray-200 rounded-lg p-3">
                        <p className="font-[500] inline">Assigned : </p> 
                    </p>
                </div>
            </div>
          </div>
        
      </div>
      )}
    </div>
    
  );
}

export default Createtask;
