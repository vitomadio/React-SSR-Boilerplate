const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const uuidv4 = require('uuid/v4');
const pool = require('../db-config/db');
// const dotenv = require('dotenv');
// dotenv.config();

// const { Pool } = require('pg')
// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
//   ssl: false
// });

const router = express.Router();


//Signup
router.post('/signup', async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query('BEGIN')
    const pwd = await bcrypt.hash(req.body.password, 5);
    await JSON.stringify(client.query('SELECT id FROM "users" WHERE "email"=$1', [req.body.email], (err, result) => {
      if (result.rows[0]) {
        console.log('this email already exists');
        res.redirect('/auth')
      }
      else {
        client.query('INSERT INTO users (id, email, password, "name", "last") VALUES ($1,$2,$3,$4,$5)', [uuidv4(), req.body.email, pwd, req.body.name, req.body.lastName], (err, result) => {
          if (err) { console.log(err) }
          else {
            client.query('COMMIT')
            console.log(result)
            res.json({ success: true, message: "Congratulations! You can now proceed to login." });
            return;
          }
        });
      }
    }));
    client.release();
  }
  catch (e) { console.log(e); }
});



//Login user.
router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.send({ success: false, message: info.message });
    }
    else if (!user) {
      res.send({ success: false, message: info.message });
    }
    else {
      req.login(user, function (err) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (req.body.remember === true) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days.
        } else {
          req.session.cookie.expires = false; // Cookie expires at end of session.
        }
        res.send({ success: true, message: info.message, user: user, session: req.session });
      });

    }
  })(req, res)
});

//Checks if user is authenticated. 
router.get('/account', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send({ success: true, userData: req.user, messages: "You are logged in." });
  }
  else {
    res.send({ success: false, message: "There's no user session." });
  }
});

//Logout
router.get('/logout', (req, res) => {
  console.log(req.isAuthenticated());
  req.logout();
  console.log(req.isAuthenticated());
  res.send({ success: true, message: 'User is not logged in!' });
});


passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = router;

//Passport configuration.
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, (req, username, password, done) => {

  loginAttempt();
  async function loginAttempt() {

    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const currentAccountsData = await JSON.stringify(client.query('SELECT id, "name", "email", "password" FROM "users" WHERE "email"=$1', [username], function (err, result) {

        if (err) {
          return done(err, false, { message: err.message })
        }
        if (result.rows[0] == null) {
          return done(null, false, { message: "User does not exist." });
        }
        else {
          bcrypt.compare(password, result.rows[0].password, function (err, check) {
            if (err) {

              return done(err, false, { message: err.message });
            }
            else if (check) {
              return done(null, { email: result.rows[0].email, name: result.rows[0].name, lastName: result.rows[0].last, id: result.rows[0].id }, { message: 'This is the user.' });
            }
            else {

              return done(null, false, { message: "Incorrect password" });
            }
          });
        }
      }))
    }

    catch (e) { throw (e); }
  };

}
));