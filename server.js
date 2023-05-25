const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/router");
const mongoose = require("mongoose");
const User = require("./models/user");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// middlewears
//cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/user", express.static(path.join(__dirname, "public")));
app.use("/blog", express.static(path.join(__dirname, "public")));
app.use("/blog/edit", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//template engine
app.set("view engine", "ejs");

//connecting to mongoose
async function mongoInit() {
  mongoose.connect(
    process.env.MONGO_URI
  );
  console.log("[MONGO]: connected to DB");
}
mongoInit();

//routing
// app.use("/", router);

//router
const loginRouter = require("./routes/router");
const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");
const createRouter = require("./routes/create");
app.use(loginRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use(createRouter);

app.listen(3000);
