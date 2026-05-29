export const uploadToCloudinary = async (file: File): Promise<string> => {
  const CLOUD_NAME = 'dvhan21ur';
  const UPLOAD_PRESET = 'portafolio';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.secure_url) {
    throw new Error(data?.error?.message || 'Error al subir el archivo a Cloudinary');
  }

  return data.secure_url as string;
};