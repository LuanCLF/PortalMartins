export interface IUserCreateRQ {
  name: string;
  email: string;
  password: string;
  cameFrom?: string;
  whatIsIt?: string;
}

export interface IUserLoginRQ {
  email: string;
  password: string;
}

export interface IUserLoginRP {
  name: string;
  email: string;
  token: string;
  createdAt: Date;
}

export interface IUserUpdateRQ {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserDeleteRP {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUser {
  email: string;
  password: string;
  createdAt: Date;
}
