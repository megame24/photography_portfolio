import express from "express";
import User from "../models/User";

const router = express.Router();

router.get("/list_of_admins", (req, res) => {
  User.find().then(users => {
    if (users) {
      res.json({ admins: users[0].listOfAdminsRes(users) });
    } else {
      res.status(400).json({ errors: { global: "Bad request" } });
    }
  });
});

router.post("/verify_admin", (req, res) => {
  const { username } = req.body;
  User.findOneAndUpdate(
    { username },
    { $set: { verified: true } },
    { new: true }
  ).then(user => {
    if (user) {
      res.json({ success: true });
    } else {
      res.status(404).json({ errors: { global: "User not found" } });
    }
  });
});

router.post("/enable_or_disable_admin", (req, res) => {
  const { username, enableOrDisable } = req.body;
  User.findOneAndUpdate(
    { username },
    { $set: { enabled: enableOrDisable } },
    { new: true }
  ).then(user => {
    if (user) {
      res.json({ success: true });
    } else {
      res.status(404).json({ errors: { global: "User not found" } });
    }
  });
});

export default router;
