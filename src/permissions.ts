export enum GROUPS {
  ADMIN = 'ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  USER = 'USER',
  CUSTOMER = 'CUSTOMER',
}

export enum ADMIN_GROUPS {
  ADMIN = GROUPS.ADMIN,
}

export enum TENANT_GROUPS {
  TENANT_ADMIN = GROUPS.TENANT_ADMIN,
  USER = GROUPS.USER,
}

export enum PERMISSIONS {
  CREATE_USER = 'CREATE_USER',
  EDIT_USER = 'EDIT_USER',
  DELETE_USER = 'DELETE_USER',
  READ_USER = 'READ_USER',
  CHANGE_USER_GROUP = 'CHANGE_USER_GROUP',
};

export const PERMISSIONS_KEY = 'permissions';

export type Permission = keyof typeof PERMISSIONS;