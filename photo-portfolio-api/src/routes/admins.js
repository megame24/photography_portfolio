import express from "express";
import User from "../models/User";

const router = express.Router();

router.get("/", (req, res) => {
    User.find().then(users => {
        console.log(users);
        if(users) {
            res.json({admins: users[0].listOfAdminsRes(users)});
        } else {
            res.status(400).json({errors: {global: "Bad request"}});
        }
    });
});

export default router;
