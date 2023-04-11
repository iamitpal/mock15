const express = require("express");
const { KanbanModel } = require("../models/kanban.model");

const kanbanRouter = express.Router();

kanbanRouter.post("/add", async (req, res) => {
  try {
    const kanban = new KanbanModel(req.body);
    await kanban.save();
    res.send({ msg: "Todo added" });
  } catch (error) {
    console.log(error);
    res.send({ Error: "Todo not added to DB" });
  }
});

kanbanRouter.get("/", async (req, res) => {
  try {
    const kanban = await KanbanModel.find();
    res.send({ todo: kanban });
  } catch (error) {
    console.log(error);
    res.send({ Error: "Kanban Todo not added to DB" });
  }
});

module.exports = { kanbanRouter };
