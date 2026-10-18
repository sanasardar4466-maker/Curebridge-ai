import { CompressionResult } from '../types';

/**
 * Client-Side Image Compression Utility
 * Downscales uploaded photos to max width/height 1024px in JPEG format.
 * Prevents heavy payloads, network timeouts, and provides fast 3-5 second analysis.
 */
export async function compressPrescriptionImage(
  input: File | Blob | string,
  maxWidth = 1024,
  maxHeight = 1024,
  quality = 0.82
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    let originalSizeKB = 0;
    let imageSrc = '';

    if (typeof input === 'string') {
      imageSrc = input;
      originalSizeKB = Math.round((input.length * (3 / 4)) / 1024);
    } else {
      originalSizeKB = Math.round(input.size / 1024);
      imageSrc = URL.createObjectURL(input);
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width === 0 || height === 0) {
          throw new Error('Invalid image dimensions');
        }

        // Calculate downscaled dimensions maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas 2D context unavailable');
        }

        // High quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw white background in case source has transparency
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Draw scaled image
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        const cleanBase64 = compressedDataUrl.replace(/^data:image\/jpeg;base64,/, '');
        const compressedSizeKB = Math.round((cleanBase64.length * (3 / 4)) / 1024);

        if (typeof input !== 'string') {
          URL.revokeObjectURL(imageSrc);
        }

        resolve({
          dataUrl: compressedDataUrl,
          base64: cleanBase64,
          mimeType: 'image/jpeg',
          originalSizeKB,
          compressedSizeKB,
          width,
          height,
        });
      } catch (err) {
        if (typeof input !== 'string') {
          URL.revokeObjectURL(imageSrc);
        }
        reject(err);
      }
    };

    img.onerror = () => {
      if (typeof input !== 'string') {
        URL.revokeObjectURL(imageSrc);
      }
      reject(new Error('Failed to load image for compression'));
    };

    img.src = imageSrc;
  });
}
