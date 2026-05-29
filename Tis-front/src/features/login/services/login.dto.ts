export interface LoginResponseDTO {
  id: string;
  email: string;
  name: string;
  access_token: string;
}

export interface LoginRequestDTO {
  email: string;
  pass: string;
}

export interface SendPasswordResetEmailRequestDTO {
  correo: string;
}

export interface SendPasswordResetEmailResponseDTO {
  success?: boolean;
  message?: string;
}

export interface ResetPasswordRequestDTO {
  password: string;
}

export interface ResetPasswordResponseDTO {
  success: boolean;
  message?: string;
}
