const express = require("express");
const { connection } = require("./Utils/db");
require("dotenv").config();
const { UserRouter } = require("./routes/user.router");
const cors = require("cors");
const { authenticate } = require("./middleware/user.middleware");
const { kanbanRouter } = require("./routes/kanban.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HomePage");
});

app.use("/users", UserRouter);
app.use(authenticate);
app.use("/kanban", kanbanRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected w/ server");
  } catch (error) {
    console.log(error);
  }
  console.log("running on port 8080");
});
