import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { useAuthContext } from "../../../contexts/AuthContext";

function ReportsLayout() {
    const { allTasks } = useAuthContext(); // Fetching tasks dynamically from the context
    const [taskData, setTaskData] = useState([]);

    useEffect(() => {
        // Assuming that allTasks is available from context
        if (Array.isArray(allTasks)) {
            setTaskData(allTasks);
        }
    }, [allTasks]); // Re-run when allTasks changes

    // Handle downloading as Excel
    const downloadExcel = () => {
        const formattedData = taskData.map((task) => ({
            _id: task._id,
            title: task.title,
            description: task.description,
            state: task.state,
            assignedTo: task.assignedTo ? task.assignedTo.username : 'N/A', // Extracting 'username' from 'assignedTo' object
            createdDate: new Date(task.createdDate).toLocaleString(),
            dueDate: new Date(task.dueDate).toLocaleString(),
            overdue: task.overdue ? "Yes" : "No",
        }));

        const ws = XLSX.utils.json_to_sheet(formattedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Tasks");
        XLSX.writeFile(wb, "task_data.xlsx");
    };

    // Handle downloading as PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Task Report", 20, 20);

        // Creating a table structure
        const tableData = taskData.map((task) => [
            task._id,
            task.title,
            task.description,
            task.state,
            task.assignedTo.username,
            new Date(task.createdDate).toLocaleString(),
            new Date(task.dueDate).toLocaleString(),
        ]);

        doc.autoTable({
            head: [["ID", "Title", "Description", "Status", "Assigned To", "Created Date", "Due Date"]],
            body: tableData,
            startY: 30,
        });

        doc.save("task_report.pdf");
    };

    return (
        <div className="p-4 w-full h-full">
            <div className="relative bg-white p-8 shadow-lg rounded-lg w-full h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Task Reports</h2>
                    <div className="flex space-x-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition-all"
                            onClick={downloadExcel}
                        >
                            Download Excel
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-all"
                            onClick={downloadPDF}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Table displaying task data */}
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 max-h-full">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">ID</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Title</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Description</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Assigned To</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Created Date</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">Due Date</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="overflow-y-auto custom-scrollbar max-h-96">
                        <table className="min-w-full table-auto">
                            <tbody>
                                {taskData.map((task) => (
                                    <tr key={task._id} className="hover:bg-gray-50 transition duration-200">
                                        <td className="px-6 py-4 border-b text-sm text-gray-700">{task._id}</td>
                                        <td className="px-6 py-4 border-b text-sm text-gray-700">{task.title}</td>
                                        <td className="px-6 py-4 border-b text-sm text-gray-700">{task.description}</td>
                                        <td className="px-6 py-4 border-b text-sm text-gray-700">{task.state}</td>
                                        <td className="px-6 py-4 border-b text-sm text-gray-700">{task.assignedTo.username}</td>
                                        <td className="px-6 py-4 border-b text-sm text-gray-700">
                                            {new Date(task.createdDate).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 border-b text-sm text-gray-700">
                                            {new Date(task.dueDate).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportsLayout;
