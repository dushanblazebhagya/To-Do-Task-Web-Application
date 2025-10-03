import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch Latest 5 Tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8000/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a Task
  const addTask = async (task) => {
    try {
      await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      // Refresh Tasks
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Done Tasks
  const markDone = async (id) => {
    try {
      await fetch(`http://localhost:8000/tasks/${id}/done`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      // Refresh Tasks
      fetchTasks();
    } catch (err) {
      console.error("Error marking task done:", err);
    }
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <h2>Add a Task</h2>
        <TaskForm addTask={addTask} />
      </div>

      <div className="right-panel">
        <h2>Added Tasks</h2>
        <TaskList tasks={tasks} markDone={markDone} />
      </div>
    </div>
  );
}

export default App;
