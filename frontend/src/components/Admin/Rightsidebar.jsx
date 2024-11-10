import { useEffect, useState } from 'react';
import { useTrelloContext } from '../../contexts/TrelloContext';
import { useAuthContext } from '../../contexts/AuthContext';

function Rightsidebar() {
    const { getAllUsersApiCall, getAllTasksApiCall, fetchUsersData, usersList, allTasks, setAllTasks } = useAuthContext();
    const { isRightSidebarOpen, toggleRightSidebar, handleCurrentTaskInAdminDashboard, statusColors } = useTrelloContext();

    const [selectedFilters, setSelectedFilters] = useState(['All']);
    const [tempFilters, setTempFilters] = useState(['All']);
    const [selectedStatusFilters, setSelectedStatusFilters] = useState([]);
    const [tempStatusFilters, setTempStatusFilters] = useState([]);

    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]);

    const fetchTasksData = async () => {
        try {
            const tasks = await getAllTasksApiCall();
            setAllTasks(tasks);
            setFilteredTasks(tasks); // Initialize with all tasks
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchUsersData();
        fetchTasksData();
    }, []);

    const handleTempFilterChange = (user) => {
        setTempFilters(prevFilters => {
            if (user === 'All') return ['All'];
            const updatedFilters = prevFilters.includes('All')
                ? [user]
                : prevFilters.includes(user)
                    ? prevFilters.filter(filter => filter !== user)
                    : [...prevFilters, user];
            return updatedFilters.length === 0 ? ['All'] : updatedFilters;
        });
    };

    const handleTempStatusFilterChange = (status) => {
        setTempStatusFilters(prevFilters =>
            prevFilters.includes(status)
                ? prevFilters.filter(filter => filter !== status)
                : [...prevFilters, status]
        );
    };

    const applyFilters = () => {
        setSelectedFilters(tempFilters);
        setSelectedStatusFilters(tempStatusFilters);
        setShowDropdown(false);
    };

    // Filter tasks whenever selectedFilters, selectedStatusFilters, or allTasks change
    useEffect(() => {
        const filtered = allTasks.filter(task => {
            const statusMatch = selectedStatusFilters.length === 0 || selectedStatusFilters.includes(task.state.toLowerCase());
            const userMatch = selectedFilters.includes('All') || selectedFilters.includes(task.assignedTo.username);
            return statusMatch && userMatch;
        });
        setFilteredTasks(filtered);
    }, [selectedFilters, selectedStatusFilters, allTasks]);



    const taskCount = filteredTasks.length;

    return (
        <div className='flex items-center'>
            <div className={`fixed h-[90%] ${isRightSidebarOpen ? "w-1/5 right-3" : "w-6 right-0"} bg-opacity-50 bg-white rounded-md transition-all duration-200`}>
                <div
                    className={`absolute ${isRightSidebarOpen ? "left-[-20px] rotate-180" : "left-[-50%] rotate-0"} top-5 bg-black opacity-80 rounded-full h-8 w-8 flex items-center justify-center transition-all duration-200 cursor-pointer`}
                    onClick={toggleRightSidebar}
                >
                    <i className="ri-arrow-drop-left-line text-2xl text-white"></i>
                </div>

                {isRightSidebarOpen && (
                    <div className="content p-3 h-[calc(100%-4rem)]">
                        <div className="relative mb-4">
                            <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center justify-between w-full bg-gray-200 px-3 py-2 rounded-md text-black font-[500]">
                                <span className="flex items-center">
                                    {selectedFilters.includes('All') ? 'All' : selectedFilters.join(', ')}
                                    {taskCount > 0 && (
                                        <span className="ml-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {taskCount}
                                        </span>
                                    )}
                                </span>
                                <i className="ri-filter-line text-lg"></i>
                            </button>

                            {showDropdown && (
                                <div className="absolute top-10 left-0 bg-white text-black border rounded-md shadow-lg w-full z-10 p-2">
                                    <h4 className="font-bold mb-2">Users</h4>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={tempFilters.includes('All')}
                                            onChange={() => handleTempFilterChange('All')}
                                            className="mr-2"
                                        />
                                        All
                                    </label>
                                    {usersList.map(user => (
                                        <label key={user._id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={tempFilters.includes(user.username)}
                                                onChange={() => handleTempFilterChange(user.username)}
                                                className="mr-2"
                                            />
                                            {user.username}
                                        </label>
                                    ))}

                                    <h4 className="font-bold mb-2 mt-4">Status</h4>
                                    {Object.keys(statusColors).map(status => (
                                        <label key={status} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={tempStatusFilters.includes(status)}
                                                onChange={() => handleTempStatusFilterChange(status)}
                                                className="mr-2"
                                            />
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </label>
                                    ))}

                                    <button
                                        onClick={applyFilters}
                                        className="mt-2 w-full bg-blue-500 text-white py-1 rounded-md font-semibold"
                                    >
                                        OK
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Task List with Scrollbar */}
                        <div className="task-list h-full custom-scrollbar overflow-y-auto pr-2 text-gray-600">
                            {filteredTasks.length === 0 ?
                                <div className='cursor-pointer p-4 mb-2 rounded-md shadow-sm border-l-4 bg-white'>
                                    No Data
                                </div>
                                :
                                filteredTasks.map((task) => (
                                    <div onClick={() => handleCurrentTaskInAdminDashboard(task)} key={task._id} className={`cursor-pointer p-4 mb-2 rounded-md shadow-sm border-l-4 bg-white ${statusColors[task.state].border || "Todos"}`}>
                                        <div className='text-sm'># {task._id}</div>
                                        <h3 className="text-gray-800 font-semibold text-lg">{task.title}</h3>
                                        <p className="text-sm text-gray-600  mb-2">Description: {task.description}</p>
                                        <p className="text-sm font-medium text-gray-900 rounded-lg">Assigned To: {task.assignedTo.username}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 py-1 rounded-lg">Status: {task.state || "No Data"}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Rightsidebar;
