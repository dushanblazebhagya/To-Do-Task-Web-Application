import React from "react";

function TaskList({ tasks, markDone }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => markDone(task.id)}>Done</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
