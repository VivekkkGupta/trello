import React from 'react';

const Taskcard = ({ taskid, title, description, state, onDragStart }) => {
    return (
        <div
            className="bg-white opacity-80 p-4 rounded-lg shadow-lg border border-gray-200 cursor-pointer"
            draggable
            onDragStart={onDragStart}
        >
            <h3 className="text-md font-semibold">#{taskid} - {title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

export default Taskcard;
