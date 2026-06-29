import type { RegisterResponse } from '../models/register.model';
import type { RegisterRequestDto } from './register.dto';

interface UsuarioRespuestaDTO {
  token: string;
  usuario: {
    id: number;
    nombre: string;
    correo: string;
    roles: string[];
  };
}

export const registerService = {
  register: async (dto: RegisterRequestDto): Promise<RegisterResponse> => {
    const nuevoDato = {
      nombre: dto.fullName,
      correo: dto.email,
      password: dto.password
    };
    console.log(nuevoDato)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoDato),
    });
    console.log(response)
    if (!response.ok) {
      // El backend devuelve un string en caso de error
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Error en el servidor');
    }

    // 2. Le decimos a TS que la respuesta tiene el formato de Java
    const dataFromBack = (await response.json()) as UsuarioRespuestaDTO;
    console.log(dataFromBack)

    // 3. GUARDAR EL TOKEN: Extraemos el JWT y lo guardamos
    if (dataFromBack.token) {
      sessionStorage.setItem('jwt', dataFromBack.token);
    }

    // 4. MAPEO Y RETORNO: Ahora TS sabe que dataFromBack.usuario existe
    return {
      success: true,
      message: 'Usuario registrado con éxito',
      data: {
        id: dataFromBack.usuario.id.toString(), // Convertimos el Long/Number a String
        email: dataFromBack.usuario.correo
      }
    };
  },
};