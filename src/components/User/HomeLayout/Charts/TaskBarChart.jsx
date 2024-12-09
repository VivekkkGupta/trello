import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function TaskBarChart({ allTasks, currentUserTasks }) {

    // Count tasks by state
    const taskCounts = {
        "Todo": 0,
        "InProgress": 0,
        "Completed": 0,
        "Cancelled": 0,
    };

    currentUserTasks.forEach((task) => {
        if (taskCounts[task.state] !== undefined) {
            taskCounts[task.state]++;
        }
    });

    // Prepare data for the bar chart
    const data = {
        labels: Object.keys(taskCounts), // States as labels
        datasets: [
            {
                label: "Task Count",
                data: Object.values(taskCounts), // Counts as data
                backgroundColor: [
                    "rgba(54, 162, 235, 1)", // To Do
                    "rgba(255, 206, 86, 1)", // In Progress
                    "rgba(75, 192, 192, 1)", // Completed
                    "rgba(255, 99, 132, 1)", // Cancelled
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1, // Ensure the y-axis increments by 1
                },
            },
        },
    };

    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">
            {/* <h2 className="text-lg font-semibold mb-4">Task Status Overview</h2> */}
            <Bar data={data} options={options} />
        </div>
    );
}

export default TaskBarChart;
