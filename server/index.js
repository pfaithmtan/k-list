const path = require('path');
const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const controller = require('../db/dbMethods');

const app = express();
const port = 3000;
// const requireAuth = passport.authenticate('jwt', { session: false });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());


// app.get('/', requireAuth, (req, res) => res.direct(''));
// app.use('/users:id', )
app.post('/api/users', controller.createUser);

app.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect(`/users/${req.user.email}`);
  });

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  successFlash: 'Welcome back!',
  failureFlash: 'Invalid email or password.',
}));

app.get('/api/users/me',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, email: req.user.email });
  });

app.post('/api/users/songs', controller.addSongs);

app.get('/api/users/songs', controller.getSongs);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => console.log(`App server listening on port: ${port}!`));
