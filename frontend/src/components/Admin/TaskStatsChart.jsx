import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAuthContext } from '../../contexts/AuthContext';
import { useTrelloContext } from '../../contexts/TrelloContext';

// Register required components for the bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TaskStatsChart() {
    const { allTasks, usersList } = useAuthContext();
    const { isRightSidebarOpen } = useTrelloContext()
    // Prepare data for the chart
    const chartData = usersList.map(user => {
        const userTasks = allTasks.filter(task => task.assignedTo?._id === user._id);
        const completedTasks = userTasks.filter(task => task.state === 'Completed');
        const onTimeTasks = completedTasks.filter(task => new Date(task.dueDate) >= new Date(task.completedDate));
        const overdueTasks = completedTasks.length - onTimeTasks.length;

        return {
            user: user.username,
            assigned: userTasks.length,
            completed: completedTasks.length,
            onTime: onTimeTasks.length,
            overdue: overdueTasks
        };
    });

    const data = {
        labels: chartData.map(item => item.user),
        datasets: [
            {
                label: 'Assigned',
                backgroundColor: 'rgba(75,192,192,1)',
                data: chartData.map(item => item.assigned)
            },
            {
                label: 'Completed',
                backgroundColor: 'rgba(54, 162, 235, 1)',
                data: chartData.map(item => item.completed)
            },
            {
                label: 'On Time',
                backgroundColor: 'rgba(153, 102, 255, 1)',
                data: chartData.map(item => item.onTime)
            },
            {
                label: 'Overdue',
                backgroundColor: 'rgba(255, 99, 132, 1)',
                data: chartData.map(item => item.overdue)
            }
        ]
    };

    return (
        <div className={`${isRightSidebarOpen ? "w-[calc(100%-20rem)]" : "w-full"} h-full flex items-center justify-center duration-200 transition-all`}>
            <div className='w-[95%] h-[95%] flex items-center justify-center bg-white bg-opacity-50 rounded-lg relative p-5'>
                <div className='flex items-center justify-center bg-white rounded-md p-5 w-full h-full text-black'>
                    <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );
}

export default TaskStatsChart;
