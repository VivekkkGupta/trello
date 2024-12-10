import { useState } from "react";

const DeleteTaskModal = ({handleBackgroundClickOnCommentBox}) => {



    return (
        
        <div className="fixed inset-0 -top-4 backdrop-blur-sm z-60 flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackgroundClickOnCommentBox}>
            <div className="bg-white rounded-md p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-center pb-4 text-xl"> Are you Sure ?</h3>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleCancelDelete}
                        className="w-full px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTaskModal;