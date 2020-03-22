import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { searchTimezone} from './service/db-service';;
import { app, passp as pass } from './config/router-config';
import { JWT_SECRET } from './constants'

dotenv.config();

app.get('/diagnostic', function (req, res) {
  res.status(200).send('ul-timezones');
});

app.post('/login', pass.authenticate('basic', { session: true }), function (
  req,
  res
) {
  if (req.user) {
    // eslint-disable-next-line no-unused-vars
    const { password, ...tokenData } = req.user;
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

app.post('/searchTimezones', pass.authenticate('jwt'), async function (
  req,
  res
) {
  try {
    const result = await searchTimezone(req.query.searchString);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(`Error searching timezones: ${e.message}`);
  }
});
