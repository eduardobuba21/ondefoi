import { TUserLogin } from './auth';

// ----------------------------------------------------------------------

export interface IUserAuth {
  id: string;
  email: string;
}

export interface IUser {
  nickname: string;
  created_at: Date;
}

// ----------------------------------------------------------------------

export type TUserCreate = TUserLogin & {
  nickname: string;
  created_at: Date;
};

// ----------------------------------------------------------------------

type TUserUpdatable = {
  nickname: string;
};

export type TUserUpdate = Partial<TUserUpdatable>;
