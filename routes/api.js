const express = require('express');
const router = express.Router();
const {
    generateToken,
    hashPassword,
    comparePassword,
    protectedRoute
} = require('../utilities/auth');
const User = require('../models/user');
const Task = require('../models/task');
const ObjectId = require('mongodb').ObjectId;


router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password);

    const db = req.db;
    const userCollection = db.collection('users');

    userCollection.findOne({
        username: username,
    }, async (err, user) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (user) {
                const result = await comparePassword(password, user.password);
                if (result) {
                    const token = await generateToken(user);
                    console.log(token);
                    res.status(200).json({
                        token: token,
                    });
                } else {
                    res.status(401).json({
                        error: 'Invalid password',
                    });
                }
            } else {
                res.status(401).json({
                    error: 'Invalid username',
                });
            }
        }
    });
});


router.post('/signup', async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    console.log(name, username, password);

    const db = req.db;

    const userCollection = db.collection('users');

    userCollection.findOne({
        username: username,
    }, async (err, user) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (user) {
                res.status(400).json({
                    error: 'Username already exists',
                });
            } else {
                const hashedPassword = await hashPassword(password);
                const newUser = new User({
                    name: name,
                    username: username,
                    password: hashedPassword,
                });

                userCollection.insertOne(newUser, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            error: err,
                        });
                    } else {
                        res.status(201).json({
                            message: 'User created',
                        });
                    }
                });
            }
        }
    });
});


router.get('/tasks', protectedRoute, async (req, res) => {
    const db = req.db;
    const taskCollection = db.collection('tasks');

    taskCollection.find({}).toArray((err, tasks) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            res.status(200).json(tasks);
        }
    });
});


router.post('/tasks', protectedRoute, async (req, res) => {
    const title = req.body.title;
    const time = req.body.time;

    const db = req.db;

    const taskCollection = db.collection('tasks');

    const newTask = new Task({
        title: title,
        time: time,
        user: ObjectId(req.user._id),
    });

    taskCollection.insertOne(newTask, async (err, result) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            res.status(200).json({
                message: 'Task created',
            });
        }
    });
});


router.delete('/tasks/:id', protectedRoute, async (req, res) => {
    const id = req.params.id;

    const db = req.db;

    const taskCollection = db.collection('tasks');

    taskCollection.deleteOne({
        _id: ObjectId(id),
    }, async (err, result) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            res.status(200).json({
                message: 'Task deleted',
            });
        }
    });
});


router.put('/tasks/:id', protectedRoute, async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const time = req.body.time;

    const db = req.db;

    const taskCollection = db.collection('tasks');

    taskCollection.updateOne({
        _id: ObjectId(id),
    }, {
        $set: {
            title: title,
            time: time,
        },
    }, async (err, _result) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            res.status(200).json({
                message: 'Task updated',
            });
        }
    });
});


router.put('/tasks/:id/toggle', protectedRoute, async (req, res) => {
    const id = req.params.id;

    const db = req.db;

    const taskCollection = db.collection('tasks');

    taskCollection.findOne({
        _id: ObjectId(id),
    }, async (err, task) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (task) {
                taskCollection.updateOne({
                    _id: ObjectId(id),
                }, {
                    $set: {
                        completed: !task.completed,
                    },
                }, async (err, result) => {
                    if (err) {
                        res.status(500).json({
                            error: err,
                        });
                    } else {
                        res.status(200).json({
                            message: 'Task updated',
                        });
                    }
                });
            } else {
                res.status(404).json({
                    error: 'Task not found',
                });
            }
        }
    });
});


module.exports = router;