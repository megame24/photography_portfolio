import express from "express";
import User from "../models/User";
import parseError from "../utils";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (user && user.isValidPassword(password)) {
      res.json({ user: user.loginResponse() });
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
    const user = new User({ username, password, question });
    user.answer = user.hashedAnswer(answer);
    user
      .save()
      .then(user => res.json({ user: user.loginResponse() }))
      .catch(error =>
        res.status(400).json({ errors: parseError(error.errors) })
      );
  } else {
    res.status(400).json({ errors: { global: "Admin secret incorrect" } });
  }
});

router.post("/reset-password", (req, res) => {
  const { username, git, answer, newPassword } = req.body;
  User.findOne({ username }).then(user => {
    if (user) {
      if (!verified) {
        res.json({ resetData: user.verifyUsernameResponse() });
      } else {
        if (user.isValidAnswer(answer.toLowerCase())) {
          user.password = newPassword;
          user
            .save()
            .then(() => res.json({success: true}))
            .catch(() =>
              res.status(500).json({errors: { global: "Try again later" }})
            );
        } else {
          res.status(400).json({errors: {global: "Incorrect answer"}});
        }
      }
    } else {
      res.status(400).json({
        errors: {
          global: "user with username: " + username + " not found"
        }
      });
    }
  });
});

export default router;
