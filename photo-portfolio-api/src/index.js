import express from "express";
import path from "path";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const port = process.env.PORT || 8080;

const app = express();

app.post("/auth/login", (req, res) => {
  res.status(400).json({errors: {global: "invalid credentials"}})
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => console.log(`server started on port: ${port}`));
