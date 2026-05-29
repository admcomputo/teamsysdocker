import type { ProfileUser } from '../models/profile.model';
import type { ProfileRequestDto } from './profile.dto';

export const profileAdapter = (user: ProfileUser): ProfileRequestDto => {
  return {
    fullName: user.fullName.trim(),
    profession: user.profession.trim(),
    bio: user.bio.trim(),
    telefono: user.telefono.trim(),
    direccion: user.direccion.trim(),
    disponibilidad: user.disponibilidad,
  };
};