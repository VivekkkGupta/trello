import React from "react";
import TaskBarChart from "./Charts/TaskBarChart";
import TaskPieChart from "./Charts/TaskPieChart";
import { useAuthContext } from "../../../contexts/AuthContext";

function HomeLayout() {
    return (
        <>
            <div className="p-4 h-full w-full overflow-y-auto">
                <div className="h-full w-full text-black">
                    <div className="flex flex-col gap-4 h-full w-full">
                        <div className="flex h-1/2 w-full gap-4 overflow-hidden">
                            <div className="flex-1">
                                <ShowTaskCount />
                            </div>
                        </div>
                        <div className="flex h-1/2 w-full gap-4 overflow-hidden">
                            <TaskBarChart />
                            <TaskPieChart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ShowTaskCount() {
    const { allTasks } = useAuthContext();

    const taskCounts = {
        Todo: 0,
        InProgress: 0,
        Completed: 0,
        Cancelled: 0,
    };

    allTasks.forEach((task) => {
        if (taskCounts[task.state] !== undefined) {
            taskCounts[task.state]++;
        }
    });

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full w-full">
            <TaskCountCard taskState="Todo" count={taskCounts["Todo"]} />
            <TaskCountCard taskState="InProgress" count={taskCounts["InProgress"]} />
            <TaskCountCard taskState="Completed" count={taskCounts["Completed"]} />
            <TaskCountCard taskState="Cancelled" count={taskCounts["Cancelled"]} />
        </div>
    );
}

function TaskCountCard({ taskState, count }) {
    const stateColors = {
        Todo: "bg-blue-500",
        InProgress: "bg-yellow-500",
        Completed: "bg-green-500",
        Cancelled: "bg-red-500",
    };

    return (
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-4 h-full w-full">
            <div
                className={`text-4xl font-bold text-white ${stateColors[taskState]} rounded-full h-16 w-16 flex items-center justify-center`}
            >
                {count}
            </div>
            <div className="mt-2 text-lg font-semibold text-gray-700">{taskState}</div>
        </div>
    );
}

export default HomeLayout;
