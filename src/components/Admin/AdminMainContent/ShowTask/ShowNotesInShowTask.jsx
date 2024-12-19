import React from 'react'
import default_avatar from "../../../../assets/images/default_avatar.jpg";
import { useAuthContext } from '../../../../contexts/AuthContext';

function ShowNotesInShowTask() {
    const { currentTask, formatTimestamp } = useAuthContext();

    return (
        <>
            <div className="mt-4 bg-gray-200 rounded-lg p-4 h-full custom-scrollbar overflow-y-auto">
                <h3 className="font-semibold text-xl mb-4">Notes & Comments</h3>
                <div className="space-y-4">
                    {currentTask.notes?.slice().reverse().map((note, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-4 p-4 rounded-lg ${note.isComment ? "bg-blue-50 text-blue-800" : "bg-green-50 text-green-800"}`}
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
        </>
    );
}

export default ShowNotesInShowTask;
