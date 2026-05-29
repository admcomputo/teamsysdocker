import type { LoginResponseDTO } from "./login.dto";
import type { User } from "../models/user.model";

export const loginAdapter = {
  toUser(dto: LoginResponseDTO): User {
    return {
      id: dto.id,
      email: dto.email,
      fullName: `${dto.name}`,
      token: dto.access_token,
    };
  },
};