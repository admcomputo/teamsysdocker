import type { RegisterUser } from '../models/register.model';
import type { RegisterRequestDto } from './register.dto';

export const registerAdapter = (user: RegisterUser): RegisterRequestDto => {
  return {
    fullName: user.fullName.trim(),
    email: user.email.toLowerCase().trim(),
    password: user.password,
  };
};
