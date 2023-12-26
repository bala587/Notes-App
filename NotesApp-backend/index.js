require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 6000;
const db = require("./db/connections");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
const app = express();

app.use(cors());
app.use(express.json());

// Database
db();

app.get("/", (req, res) => {
  res.send("Hello Everyone! This is my notes app");
});

app.use("/user", userRouter);
app.use("/note", noteRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
