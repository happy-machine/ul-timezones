import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT;
export const SECRET = process.env.SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;

export const MYSQL_SERVER = process.env.MYSQL_SERVER;
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
export const MYSQL_TEST_DATABASE = process.env.MYSQL_TEST_DATABASE;
export const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

export const MODEL = 'xai_model';
export const COLLECTION = 'xai_collection';
export const DATA = 'xai_data';
export const USER = 'xai_user';
export const COLLECTION_DATA = 'xai_collection_data';
export const LABEL = 'xai_label';
export const METADATA = 'xai_metadata';
export const STRATEGY = 'xai_strategy';
