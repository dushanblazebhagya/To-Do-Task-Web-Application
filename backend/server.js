const express = require("express");
const cors = require("cors");
const { Task } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// Creating Tasks
app.post("/tasks", async (req, res) => {
  const task = await Task.create({ ...req.body, completed: false });
  res.json(task);
});

// Most Recent Uncompleted 5 Tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll({
    where: { completed: false },
    order: [["createdAt", "DESC"]],
    limit: 5,
  });
  res.json(tasks);
});

// Mark task as done
app.put("/tasks/:id/done", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).send("Task not found");
  task.completed = true;
  await task.save();
  res.json(task);
});

app.listen(8000, () => console.log("Port 8000 is Running"));
