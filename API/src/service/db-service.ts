import dotenv from 'dotenv';
import { knex_dev } from '../config/knex-config';

dotenv.config();

export const searchTimezone = async (searchString: string, knex = knex_dev) =>
  await knex
    .select()
    .from('timezones')
    .where('name', 'like', `%${searchString}%`);

export const getTimezoneById = async (id: number, knex = knex_dev) =>
  await knex
    .select()
    .from('timezones')
    .where({ id });

export const getTimezones = async (knex = knex_dev) =>
  await knex.select().from('timezones');

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
