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
export interface IUser1 {
  menuImageUrl: string;
  menuJson: string;
  phone: string;
  email: string;
  twoPhaseAuth: boolean;
  userId: string;
  planId: string;
  recaptcha:boolean;
}

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
  verificationId:string;
  phoneReg: boolean;
}
export interface IChat {
  consultation: boolean;
  menu: boolean;
  selfCareMenu: boolean;
  mannedConsultation:boolean;
  selfCheck:boolean;
  consultationReservation:string,
  onlineHealthRoom:boolean;
  onlineHealthRoomMenu:boolean;
  onlineHealthRoomReservation:string,
}
