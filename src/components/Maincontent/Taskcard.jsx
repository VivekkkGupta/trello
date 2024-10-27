import React from 'react';

const Taskcard = ({ title, description, state }) => {
    return (
        <div className="bg-white opacity-80 p-4 rounded-lg shadow-lg border border-gray-200 cursor-pointer">
            <h3 className="text-md font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

export default Taskcard;
