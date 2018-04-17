import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import auth from "./routes/auth";
import dotenv from "dotenv";
import morgan from "morgan";
import Promise from "bluebird";

const port = process.env.PORT || 8080;
const app = express();

dotenv.config();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, () =>
  console.log("mongodb set up at port 27017 as photo-portfolio")
);

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api/auth", auth);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => console.log(`server started on port: ${port}`));
