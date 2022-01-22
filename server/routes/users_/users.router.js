const express = require('express');

const {
    handleAllUsersPost, 
    handleAddUserPost,
    handleDeleteUser
} = require('./users.controller');

usersRouter = express.Router();

// Populate user drop down options
usersRouter.post('/allusers', handleAllUsersPost);

// Add new user from the add user pop-up module.
usersRouter.post('/adduser', handleAddUserPost);

// DeleteUser from DB.
usersRouter.delete('/remove-user', handleDeleteUser);


module.exports = usersRouter;