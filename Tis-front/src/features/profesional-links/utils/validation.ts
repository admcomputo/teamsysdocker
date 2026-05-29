import { z } from 'zod';

const isValidUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const isLinkedInUrl = (value: string) => {
  try {
    const url = new URL(value);

    return (
      url.hostname === 'linkedin.com' ||
      url.hostname === 'www.linkedin.com'
    );
  } catch {
    return false;
  }
};

const isGitHubUrl = (value: string) => {
  try {
    const url = new URL(value);

    return (
      url.hostname === 'github.com' ||
      url.hostname === 'www.github.com'
    );
  } catch {
    return false;
  }
};

export const professionalLinksSchema = z
  .object({
    nombreRed: z.enum(['LinkedIn', 'GitHub'], {
      message: 'Selecciona LinkedIn o GitHub.',
    }),

    urlPerfil: z
      .string()
      .trim()
      .min(1, 'La URL del perfil es obligatoria.')
      .refine(isValidUrl, {
        message: 'Ingresa una URL válida.',
      }),

    esPublico: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.nombreRed === 'LinkedIn' && !isLinkedInUrl(data.urlPerfil)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['urlPerfil'],
        message:
          'Si seleccionas LinkedIn, solo se permite un enlace de LinkedIn.',
      });
    }

    if (data.nombreRed === 'GitHub' && !isGitHubUrl(data.urlPerfil)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['urlPerfil'],
        message:
          'Si seleccionas GitHub, solo se permite un enlace de GitHub.',
      });
    }
  });

export type ProfessionalLinksFormData = z.infer<
  typeof professionalLinksSchema
>;