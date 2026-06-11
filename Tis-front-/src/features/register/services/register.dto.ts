import type { RegisterUser } from '../models/register.model';

export type RegisterRequestDto = RegisterUser;

export interface RegisterResponseDto {
  ok: boolean;
  msg: string;
  user?: {
    uid: string;
    email: string;
  };
}
