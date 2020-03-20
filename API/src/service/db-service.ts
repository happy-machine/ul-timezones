import dotenv from 'dotenv';
import { Model, User } from '../types';
import { MODEL, COLLECTION, STRATEGY, USER } from '../constants';
import { knex_dev } from '../config/knex-config';

dotenv.config();

export const searchTimezone = async (searchString: string, knex = knex_dev) =>
  await knex
    .select()
    .from('timezones')
    .where('name', 'like', `%${searchString}%`);

export const getCollection = async (id: number, knex = knex_dev) =>
  await knex
    .select()
    .from(COLLECTION)
    .where({ id });

export const getStrategy = async (id: number, knex = knex_dev) =>
  await knex
    .select()
    .from(STRATEGY)
    .where({ id });

export const addModel = async (rows: Model, knex = knex_dev) =>
  await knex(MODEL).insert({
    ...rows,
  });

export const getTimezoneById = async (id: number, knex = knex_dev) =>
  await knex
    .select()
    .from('timezones')
    .where({ id });

export const getTimezones = async (knex = knex_dev) =>
  await knex.select().from('timezones');

export const updateModel = async (args, knex = knex_dev) => {
  const { id, ...columns } = args;
  await knex(MODEL)
    .where({ id })
    .update({
      ...columns,
    });
};

export const deleteModel = async (id: number, knex = knex_dev) =>
  await knex(MODEL)
    .where({ id })
    .del();

export const getUserById = async (id: number, knex = knex_dev) =>
  await knex
    .select()
    .from('users')
    .where({ id });

export const getUsers = async (knex = knex_dev) =>
  await knex.select().from('users');

export const getUserByLogin = async (login: string, knex = knex_dev) =>
  await knex
    .select()
    .from('users')
    .where({ login });

export const addUser = async (rows: User, knex = knex_dev) => {
  return await knex(USER).insert({
    ...rows,
    model_manager_access: rows.model_manager_access === 'true' ? true : false,
    marking_tool_access: rows.marking_tool_access === 'true' ? true : false,
  });
};

export const updateUser = async (args: User, knex = knex_dev) => {
  const { id, ...columns } = args;
  await knex(USER)
    .where({ id })
    .update({
      ...columns,
    });
};

export const deleteUser = async (id: number, knex = knex_dev) =>
  await knex(USER)
    .where({ id })
    .del();
