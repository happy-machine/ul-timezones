import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { BasicStrategy } from 'passport-http';
import { Strategy } from 'passport-http-bearer';
import { SERVER_PORT, SECRET, JWT_SECRET } from '../constants';
import { userLogin, userVerify } from '../lib/auth';

dotenv.config();
export const app = express();

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,OPTIONS,PATCH'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new BasicStrategy(async (username, password, done) => {
    const result = await userLogin({ login: username, password: password });
    return done(null, result);
  })
);

passport.use(
  'jwt',
  new Strategy(async (token, done) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return done(null, await userVerify(decoded));
    } catch (e) {
      return done(null, false, { message: 'Error in JWT' });
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((username, done) => done(null, { username }));

export const passp = passport;
export const server = app.listen(SERVER_PORT, () =>
  console.log(`Listening on Port: ${SERVER_PORT}`)
);
