import express from "express";
import User from "../models/User";
import parseError from "../utils";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (user && user.isValidPassword(password)) {
      res.json({ user: user.authJsonRes() });
    } else {
      res
        .status(400)
        .json({ errors: { global: "Incorrect username or password" } });
    }
  });
});

router.post("/register", (req, res) => {
  const { username, password, question, answer, secret } = req.body;
  if (secret === process.env.ADMIN_SECRET) {
    const user = new User({ username, password, question, answer });
    user
      .save()
      .then(user => res.json({ user: user.authJsonRes() }))
      .catch(error => res.status(400).json({ errors: parseError(error.errors) }));
  } else {
    res.status(400).json({ errors: { global: "Admin secret incorrect" } });
  }
});

export default router;
