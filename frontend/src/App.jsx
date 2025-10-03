import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch Tasks
  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add A Task
  const addTask = async (task) => {
    try {
      const res = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Click Done Button
  const markDone = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      const updated = await res.json();

      setTasks(tasks.map((task) => (task.id === id ? updated : task)));
    } catch (err) {
      console.error("Error marking task as done:", err);
    }
  };

  return (
    <div className="app-container">
      {}
      <div className="left-panel">
        <h2>Add a Task</h2>
        <TaskForm addTask={addTask} />
      </div>

      {}
      <div className="right-panel">
        <h2>Added Tasks</h2>
        <TaskList tasks={tasks} markDone={markDone} />
      </div>
    </div>
  );
}

export default App;
