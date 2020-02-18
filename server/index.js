const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const controller = require('../db/dbMethods');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    controller.findUserByEmail(email)
      .then((user) => {
        console.log(user);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.dataValues.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch((error) => done(error));
  },
));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  controller.findUserByEmail(email)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
});

app.post('/api/login',
  passport.authenticate('local', {
    successRedirect: '/userPage',
    failureRedirect: '/login',
  }));

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.post('/api/users', controller.createUser);

app.post('/api/users/songs', controller.addSongs);

app.get('/api/users/songs', controller.getUserSongs);

app.get('/test', (req, res) => {
  res.send(req.user);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => console.log(`App server listening on port: ${port}!`));
