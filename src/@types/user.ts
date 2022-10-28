import { TUserAuth } from './auth';

// ----------------------------------------------------------------------

export interface IUser {
  id: string;
  nickname: string;
  created_at: Date;
}

// ----------------------------------------------------------------------

export type TUserCreate = TUserAuth & {
  nickname: string;
  created_at: Date;
};

// ----------------------------------------------------------------------

type TUserUpdatable = {
  nickname: string;
};

export type TUserUpdate = Partial<TUserUpdatable>;
