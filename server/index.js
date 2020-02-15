const path = require('path');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const controller = require('../db/dbMethods');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());


passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    controller.findUserByEmail(email)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch((error) => {
        return done(error);
      });
  },
));

app.post('/api/users', controller.createUser);

app.post('/api/users/songs', controller.addSongs);

app.get('/api/users/songs', controller.getSongs);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => console.log(`App server listening on port: ${port}!`));
