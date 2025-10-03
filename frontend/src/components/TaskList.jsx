import React from "react";

function TaskList({ tasks, markDone }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {!task.completed ? (
            <button onClick={() => markDone(task.id)}>Done</button>
          ) : (
            <span style={{ color: "green", fontWeight: "bold" }}>✔ Completed</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
