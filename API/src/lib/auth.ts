import { getUserByLogin, getUserById } from '../service/db-service';
import { SECRET } from '../constants';
import { knex_dev } from '../config/knex-config';
import sha1 from 'sha1';

export const userLogin = async (args, knex = knex_dev) => {
  const foundUser = await getUserByLogin(args.login, knex);
  if (foundUser && foundUser[0].key === sha1(`${SECRET}${args.password}`)) {
    return Object.assign({}, foundUser[0]);
  }
  return false;
};

export const userVerify = async (args, knex = knex_dev) => {
  const foundUser = await getUserById(args.id, knex);
  return Object.assign({}, foundUser[0]) || false;
};
