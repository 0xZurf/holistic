import { useState } from 'react';
import { adminUploadImage } from '../../lib/api';
import ImageUpload from '../ui/ImageUpload';

export default function ImageUploader({ value, onChange, label = 'Image', className = '' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFile(file) {
    setUploading(true);
    setError(null);
    try {
      const result = await adminUploadImage(file);
      onChange(result.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={className}>
      <ImageUpload
        value={uploading ? null : value}
        onChange={handleFile}
        label={label}
      />
      {uploading && (
        <p className="mt-2 text-sm text-sage animate-pulse">Uploading...</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
      {value && !uploading && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="mt-2 text-xs text-red-500 hover:text-red-700"
        >
          Remove image
        </button>
      )}
    </div>
  );
}
