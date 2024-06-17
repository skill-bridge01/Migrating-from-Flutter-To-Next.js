export enum EUserRole {
  ADMIN = "ADMIN",
  TRADER = "TRADER",
  MONITOR = "MONITOR",
  MAINTAINER = "MAINTAINER",
  LIQUIDATOR = "LIQUIDATOR",
  USER = "USER",
}

export type UserRoleStrings = keyof typeof EUserRole;

export enum EUserStatus {
  TBA = "TBA",
  APPROVED = "APPROVED",
  BLOCKED = "BLOCKED",
}

export type UserStatusStrings = keyof typeof EUserStatus;

export interface IUser {
  bio: string;
  nickname: string;
  uid?: string;
  name: string;
  email?: string;
  password?: string;
  connected?: boolean;
  publicKey?: any;
  avatar?: string;
  role?: EUserRole;
  status?: EUserStatus;
  online?: boolean;
  created?: Date;
  updated?: Date;
}

export interface INameChangeRequest {
  name: string;
  newName: string;
}

export interface IPasswordChangeRequest {
  name: string;
  newPassword: string;
}

export interface IPhone {
  phone: string;
  verify: boolean;
}
