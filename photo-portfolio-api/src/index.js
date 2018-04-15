import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import auth from './routes/auth';

const Promise = global.Promise;
const port = process.env.PORT || 8080;
const app = express();

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/photo-portfolio", () =>
  console.log("mongodb set up at port 27017 as photo-portfolio")
);

app.use(bodyParser.json());
app.use("/auth", auth);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => console.log(`server started on port: ${port}`));
