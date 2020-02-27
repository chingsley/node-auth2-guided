const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig = {
  name: 'monkey', // by default, it would be sid. Leaving the default tells intruders about the session library you're using
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 120, // lasts for 120 seconds = 2 minutes
    secure: false, // send cookie only over https, set to true in production,
    httpOnly: true, // always set to true. It means client JS can't access the cookie
  },
  resave: false, // if there are no changes to the session, don't resave it
  saveUninitialized: true, // GDPR laws against setting cookies automatically. False for production, and only set it to true if user agrees to setting cookie on their browser
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
