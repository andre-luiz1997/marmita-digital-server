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
  DASHBOARD = 'DASHBOARD',
  CREATE_USER = 'USERS.CREATE',
  EDIT_USER = 'USERS.EDIT',
  DELETE_USER = 'USERS.DELETE',
  READ_USER = 'USERS.READ',
  CREATE_TENANT = 'TENANTS.CREATE',
  EDIT_TENANT = 'TENANTS.EDIT',
  DELETE_TENANT = 'TENANTS.DELETE',
  READ_TENANT = 'TENANTS.READ',
  CREATE_PLAN = 'PLANS.CREATE',
  EDIT_PLAN = 'PLANS.EDIT',
  DELETE_PLAN = 'PLANS.DELETE',
  READ_PLAN = 'PLANS.READ',
  SUBSCRIPTIONS = 'SUBSCRIPTIONS',
};

export const GROUP_PERMISSIONS = {
  [GROUPS.ADMIN]: Object.values(PERMISSIONS),
  [GROUPS.TENANT_ADMIN]: [
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.EDIT_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.READ_USER,
    PERMISSIONS.DASHBOARD,
    PERMISSIONS.SUBSCRIPTIONS
  ],
  [GROUPS.USER]: [
    PERMISSIONS.READ_USER,
  ],
  [GROUPS.CUSTOMER]: [],
}

export const PERMISSIONS_KEY = 'permissions';

export type Permission = keyof typeof PERMISSIONS;