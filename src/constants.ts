import * as dotenv from 'dotenv';
dotenv.config();

export const APP_PORT = process.env.APP_PORT || 3000;
export const APP_ENV = process.env.APP_ENV || 'development';
export const APP_HOST = process.env.APP_HOST || 'localhost';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 27017;
export const DB_NAME = process.env.DB_NAME || 'marmita';
export const DB_USER = process.env.DB_USER || '';
export const DB_PASS = process.env.DB_PASS || '';

export enum PROVIDERS {
  DATABASE = 'DATABASE_CONNECTION',
  USER = 'USER',
}

export enum SERVICES {
  AUTH = 'AuthService',
  USER = 'UserService',
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export const IS_PUBLIC_KEY = 'isPublic';