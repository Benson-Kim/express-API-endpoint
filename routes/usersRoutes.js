const express = require('express');
const router = express.Router();

const { singleUser, allUsers, Login, createUser } = require('../controllers/userController')

router.get('/users', allUsers);
router.get('/user/:email', singleUser);
router.post('/users/login', Login);
router.post('/createuser', createUser);

module.exports = { router };