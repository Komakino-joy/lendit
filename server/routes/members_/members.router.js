const express = require('express');

const {
    handleSignin,
    handleRegister
} = require('./members.controller');

const membersRouter = express.Router();

// Signin an existing member
membersRouter.post('/signin', handleSignin);

// Register a new member
membersRouter.post('/register', handleRegister);

module.exports = membersRouter;