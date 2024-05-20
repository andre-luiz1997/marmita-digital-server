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
  TENANT = 'TENANT',
  PLAN = 'PLAN',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export enum ENTITIES {
  USER = 'users',
  TENANT = 'tenants',
  PLAN = 'plans',
  SUBSCRIPTION = 'subscriptions',
}

export enum SERVICES {
  AUTH = 'AuthService',
  USER = 'UserService',
  TENANT = 'TenantService',
  PLAN = 'PlanService',
  SUBSCRIPTION = 'SubscriptionService',
}

export enum REPOSITORIES {
  USER = 'UserRepository',
  TENANT = 'TenantRepository',
  PLAN = 'PlanRepository',
  SUBSCRIPTION = 'SubscriptionRepository',
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export const IS_PUBLIC_KEY = 'isPublic';

export type CURRENCY_SYMBOLS = 'R$' | '$' | '€';
export const CURRENCIES: {
  value: string,
  symbol: CURRENCY_SYMBOLS,
  label: string
}[] = [
  { value: 'BRL',symbol: 'R$', label: 'Real brasileiro - R$' },
  { value: 'USD',symbol: '$', label: 'Dollar - US$' },
  { value: 'EUR',symbol: '€', label: 'Euro - €' },
]

export enum PAYMENT_METHODS  {
  PIX = 'PIX',
  CARD= 'CARD',
};

export enum TRANSACTION_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  REFUNDED = 'REFUNDED',
}

export enum TRANSACTION_GATEWAYS {
  PAGARME = 'PAGARME',
  MERCADOPAGO = 'MERCADOPAGO',
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
}

export enum PERSON_TYPES {
  INDIVIDUAL = 'individual',
  CORPORATION = 'corporation',
}