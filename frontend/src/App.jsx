import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:8000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/tasks", form);
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  const markDone = async (id) => {
    await axios.put(`http://localhost:8000/tasks/${id}/done`);
    fetchTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <b>{t.title}</b>: {t.description}{" "}
            <button onClick={() => markDone(t.id)}>Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
