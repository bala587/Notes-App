const express = require("express");
const noteRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { NoteModel } = require("../models/NoteModel");

noteRouter.use(authenticator);

noteRouter.get("/", async (req, res) => {
  let token = req.headers.authorization;

  jwt.verify(token, "saranyaaa", async (err, decode) => {
    try {
      let data = await NoteModel.find({ user: decode.userId });
      res.send({
        data: data,
        message: "Success",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
});

// create notes
noteRouter.post("/create", async (req, res) => {
  try {
    let note = new NoteModel(req.body);
    await note.save();
    res.send({
      message: "Note is created",
      status: 1,
    });
  } catch (error) {
    res.send({ message: error.message, status: 0 });
  }
});

// update notes
noteRouter.put("/edit", async(req, res) => {
    let { id } = req.headers;
    try {
      await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
      res.send({
        message: "Note updated",
        status: 1
      });
        // console.log(NoteModel)
    } catch (error) {
      res.send({
        message: error.message,
        status: 0
      });
    }
})

// Delete notes
noteRouter.delete("/delete", async (req, res) => {
  let { id } = req.headers;
  try {
      await NoteModel.findByIdAndDelete({ _id: id });
      res.send({message:"Note Deleted"})
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});


module.exports = { noteRouter };
