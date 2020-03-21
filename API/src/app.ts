import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import * as db from './service/db-service';
import { JWT_SECRET } from './constants';
import { app, passp as pass } from './config/router-config';

dotenv.config();

app.post('/login', pass.authenticate('basic', { session: true }), function(
  req,
  res
) {
  if (req.user) {
    const tokenData = req.user;
    delete tokenData.password;
    res.send({
      status: 'success',
      jwt: jwt.sign(tokenData, JWT_SECRET, {
        expiresIn: 14 * 24 * 60 * 60 * 1000,
      }),
    });
  } else {
    res.status(403).send({ message: 'Not authorized' });
  }
});

app.get('/diagnostic', function(req, res) {
  res.status(200).send('ul-timezones');
});

app.post('/searchTimezones', pass.authenticate('jwt'), async function(
  req,
  res
) {
  try {
    const result = await db.searchTimezone(req.query.searchString);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(`Error searching timezones: ${e.message}`);
  }
});
