interface ChangePasswordRequestDTO {
  passwordActual: string;
  passwordNuevo: string;
}

interface ChangePasswordResponseDTO {
  success: boolean;
  message?: string;
  data?: any;
}

export const changePasswordService = {
  async changePassword(
    passwordActual: string,
    passwordNuevo: string
  ): Promise<ChangePasswordResponseDTO> {
    const token = sessionStorage.getItem('jwt');

    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const payload: ChangePasswordRequestDTO = {
      passwordActual,
      passwordNuevo
    };

    try {
      const response = await fetch('http://localhost:8081/api/password/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || 'Error al cambiar la contraseña');
      }

      const data = await response.json();
      return {
        success: true,
        message: data.message || 'Contraseña cambiada exitosamente',
        data
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cambiar la contraseña';
      return {
        success: false,
        message: errorMessage
      };
    }
  }
};
