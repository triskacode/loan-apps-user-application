export enum UserRole {
  MANAGER = 'manager',
  USER = 'user',
}

export enum UserState {
  CREATED = 'created',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export enum UpdateUserCMD {
  UPDATE = 'update',
  ACTIVATE = 'activate',
  SUSPEND = 'suspend',
  SOFT_DELETE = 'soft-delete',
  RESTORE = 'restore',
}
