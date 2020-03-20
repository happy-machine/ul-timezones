import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import sha1 from 'sha1';
// import * as tools from "./utils/tools";
// import * as db from "./service/db_service";
import { JWT_SECRET, USER, SECRET } from './constants';
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

// app.get("/getConfigDirectory", pass.authenticate("jwt"), async function(
//   req,
//   res
// ) {
//   const fileList = await file.readDirectory("config");
//   res.send(JSON.stringify(fileList));
// });

app.post('/user', pass.authenticate('jwt'), async function(req, res) {
  // try {
  //   const result = await db.addUser({
  //     ...req.query,
  //     password: sha1(`${SECRET}${req.query.password}`)
  //   });
  //   sendEmails(req.query, res, result[0]);
  // } catch (e) {
  //   res.status(500).send(`Error creating user: ${e.message}`);
  // }
});

app.put('/user', pass.authenticate('jwt'), async function(req, res) {
  // try {
  //   await db.updateUser({ ...req.query });
  //   res.status(200).send(`Updated user id: ${req.query.id}`);
  // } catch (e) {
  //   res.status(500).send(`Error updating user ${req.query.id}: ${e.message}`);
  // }
});

app.delete('/user', pass.authenticate('jwt'), async function(req, res) {
  // try {
  //   await db.deleteUser(req.query.id);
  //   res.status(200).send(`Deleted user id: ${req.query.id}`);
  // } catch (e) {
  //   res.status(500).send(`Error deleting user ${req.query.id}: ${e.message}`);
  // }
});

console.log('hod3rrddddee');
