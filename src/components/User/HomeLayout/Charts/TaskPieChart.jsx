import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { useAuthContext } from "../../../../contexts/AuthContext";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function TaskPieChart() {
    const { allTasks } = useAuthContext();

    // Count tasks by state
    const taskCounts = {
        "Todo": 0,
        "InProgress": 0,
        "Completed": 0,
        "Cancelled": 0,
    };

    allTasks.forEach((task) => {
        if (taskCounts[task.state] !== undefined) {
            taskCounts[task.state]++;
        }
    });

    // Prepare data for the pie chart
    const data = {
        labels: Object.keys(taskCounts), // States as labels
        datasets: [
            {
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
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow-md flex justify-center">
            {/* <h2 className="text-lg font-semibold mb-4">Task Status Distribution</h2> */}
            <Pie data={data} options={options} />
        </div>
    );
}

export default TaskPieChart;
