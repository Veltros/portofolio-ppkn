/**
 * Upload gambar ke Cloudinary menggunakan Unsigned Upload Preset.
 * Menghasilkan secure_url publik yang dapat diakses oleh siapa saja di internet.
 */
export async function uploadToCloudinary(file) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dhnnefcto';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'portofolio_preset';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Gagal mengunggah foto (${response.statusText})`;
    throw new Error(message);
  }

  const data = await response.json();
  return data.secure_url;
}
