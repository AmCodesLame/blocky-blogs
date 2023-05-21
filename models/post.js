const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    summary: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const postModel = model("post", postSchema);

module.exports = postModel;
