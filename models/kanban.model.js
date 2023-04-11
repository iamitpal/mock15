const mongoose = require("mongoose");

const subtask = {
  title: String,
  isCompleted: Boolean,
};

const kanbanSchema = mongoose.Schema({
  title: String,
  description: String,
  subtask: [subtask],
  status: String,
});

const KanbanModel = mongoose.model("kanbanTodo", kanbanSchema);

module.exports = { KanbanModel };
