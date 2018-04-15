import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post("/login", (req, res) => {
    const {username, password} = req.body;
    User.findOne({username}).then(user => {
        if(user && user.isValidPassword(password)) {
            res.json({user: {username: user.username}});
        } else {
            res.status(400).json({errors: {global: 'Incorrect username or password'}});
        }
    });
});

export default router;