const express = require("express");
const cors = require("cors");
const { Task, sequelize } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// Check DB Connection
sequelize.authenticate().then(() => console.log("database connected")).catch(console.error);

// Create a task
app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, completed: false });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get latest 5 tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { completed: false },
      order: [["createdAt", "DESC"]],
      limit: 5
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark task as done
app.put("/tasks/:id/done", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    task.completed = true;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Port ${PORT} is Running`));
