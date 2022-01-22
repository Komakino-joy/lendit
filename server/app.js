const express = require('express');
const path = require('path');

const cors = require('cors');
const helmet = require ('helmet');
const fileUpload = require('express-fileupload');

const dotenv = require('dotenv');
dotenv.config();

const membersRouter = require('./routes/members_/members.router');
const assetsRouter = require('./routes/assets_/assets.router');
const usersRouter = require('./routes/users_/users.router');
const reportsRouter = require('./routes/reports_/reports.router');

const app = express();

app.use(cors());

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use(express.json({ limit: '10mb', extended: true }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json());

app.use('/members', membersRouter);
app.use('/assets', assetsRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;