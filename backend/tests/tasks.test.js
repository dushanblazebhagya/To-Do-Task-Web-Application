const request = require("supertest");
const express = require("express");
const { Task, sequelize } = require("../models");

const app = express();
app.use(express.json());

app.post("/tasks", async (req, res) => {
  const task = await Task.create({ ...req.body, completed: false });
  res.json(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll({
    where: { completed: false },
    order: [["createdAt", "DESC"]],
    limit: 5,
  });
  res.json(tasks);
});

app.put("/tasks/:id/done", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).send("Task not found");
  task.completed = true;
  await task.save();
  res.json(task);
});

describe("Task API", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task", description: "Testing" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Task");
    expect(res.body.completed).toBe(false);
  });

  it("should list latest 5 uncompleted tasks", async () => {
    await sequelize.sync({ force: true }); // reset DB

    const now = Date.now();
    // Create 6 tasks
    for (let i = 1; i <= 6; i++) {
      await Task.create({
        title: `Task ${i}`,
        createdAt: new Date(now + i * 1000),
        updatedAt: new Date(now + i * 1000),
      });
    }

    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(5);
    expect(res.body[0].title).toBe("Task 6"); 
    expect(res.body[4].title).toBe("Task 2");
  });

  it("should mark a task as done", async () => {
    const task = await Task.create({ title: "To Complete" });

    const res = await request(app).put(`/tasks/${task.id}/done`);

    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);

    const tasksRes = await request(app).get("/tasks");
    const titles = tasksRes.body.map((t) => t.title);
    expect(titles).not.toContain("To Complete");
  });
});
