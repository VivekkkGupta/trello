// Adminmaincontent.js
import React from 'react';
import ShowTask from './ShowTask/ShowTask';
import TaskStatsChart from './TaskStatsChart';

function Adminmaincontent() {
  return (
    <div className="relative w-full h-full">
      <ShowTask className="relative z-10" />
      <TaskStatsChart />
    </div>
  );
}

export default Adminmaincontent;
