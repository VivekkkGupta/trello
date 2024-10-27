import React from 'react';
import { useTrelloContext } from '../../contexts/TrelloContext';

function ColorPanel() {
    const colors = [
        { color: 'bg-gradient-to-br from-blue-500 to-blue-700', emoji: '❄️' },
        { color: 'bg-gradient-to-br from-teal-500 to-blue-800', emoji: '🌊' },
        { color: 'bg-gradient-to-br from-purple-500 to-pink-500', emoji: '🌈' },
        { color: 'bg-gradient-to-br from-orange-400 to-pink-500', emoji: '🍑' },
        { color: 'bg-gradient-to-br from-green-500 to-teal-700', emoji: '🌍' },
        { color: 'bg-gradient-to-br from-red-500 to-orange-700', emoji: '👨‍🌾' },
        { color: 'bg-gradient-to-br from-yellow-500 to-orange-600', emoji: '☀️' },
        { color: 'bg-gradient-to-br from-indigo-500 to-purple-700', emoji: '🔮' },
        { color: 'bg-gradient-to-br from-pink-500 to-red-500', emoji: '🌹' },
        { color: 'bg-gradient-to-br from-gray-500 to-gray-700', emoji: '⚙️' },
        { color: 'bg-gradient-to-br from-lime-500 to-green-600', emoji: '🍃' },
        { color: 'bg-gradient-to-br from-blue-600 to-purple-600', emoji: '🚀' },
        { color: 'bg-gradient-to-br from-orange-500 to-red-600', emoji: '🔥' },
        { color: 'bg-gradient-to-br from-purple-400 to-pink-600', emoji: '💜' },
        { color: 'bg-gradient-to-br from-sky-400 to-blue-500', emoji: '☁️' },
        { color: 'bg-gradient-to-br from-yellow-400 to-green-500', emoji: '🍀' },
        { color: 'bg-gradient-to-br from-red-400 to-purple-600', emoji: '🎉' },
        { color: 'bg-gradient-to-br from-teal-400 to-cyan-600', emoji: '💧' }
    ];

    const { isColorPanelOpen, toggleColorPanel, setSelectedColor } = useTrelloContext();

    return (
        <div className={`text-black absolute top-0 ${isColorPanelOpen ? "left-0" : "left-[-100%]"} h-full w-full rounded-lg bg-white shadow-lg p-2 transition-all duration-200 custom-scrollbar overflow-y-auto`}>
            <div className='flex items-center justify-between px-5 my-3'>
                <h3 className="text-center font-semibold">Colors</h3>
                <div className='hover:bg-black hover:bg-opacity-50 w-8 h-8 rounded-sm cursor-pointer'
                    onClick={toggleColorPanel}>
                    <i className="ri-arrow-drop-left-line text-3xl"></i>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {colors.map((item, index) => (
                    <div
                        key={index}
                        className={`w-full h-20 rounded-lg flex items-center justify-center ${item.color} cursor-pointer`}
                        onClick={() => setSelectedColor(item.color)} // Set selected color
                    >
                        <span className="text-2xl">{item.emoji}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ColorPanel;
