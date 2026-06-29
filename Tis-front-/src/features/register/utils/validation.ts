import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre es demasiado largo')
    .regex(/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/, 'Cada nombre y apellido debe iniciar con mayúscula y no contener números'),
  profession: z.string().optional().or(z.literal('')),
  email: z.string()
    .email('El formato del correo no es válido'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[@#$%^&+=!_*.-]/, 'Debe contener al menos un carácter especial (@#$%^&+=!_.*-)'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;