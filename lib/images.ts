import { createClient } from '@supabase/supabase-js';

// Supabase client for image operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface ImageUploadResult {
  url: string;
  path: string;
  publicUrl: string;
  cdnUrl: string;
}

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

/**
 * Upload image from URL to Supabase Storage
 */
export async function uploadImageFromUrl(
  imageUrl: string,
  bucket: string = 'images',
  folder: string = 'uploads'
): Promise<ImageUploadResult> {
  try {
    // Fetch image from URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = contentType.split('/')[1] || 'jpg';
    const fileName = `${folder}/${timestamp}-${randomString}.${extension}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, imageBuffer, {
        contentType,
        upsert: false
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return {
      url: data.path,
      path: fileName,
      publicUrl: publicData.publicUrl,
      cdnUrl: getOptimizedImageUrl(publicData.publicUrl)
    };

  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

/**
 * Upload image file to Supabase Storage
 */
export async function uploadImageFile(
  file: File,
  bucket: string = 'images',
  folder: string = 'uploads'
): Promise<ImageUploadResult> {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop() || 'jpg';
    const fileName = `${folder}/${timestamp}-${randomString}.${extension}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return {
      url: data.path,
      path: fileName,
      publicUrl: publicData.publicUrl,
      cdnUrl: getOptimizedImageUrl(publicData.publicUrl)
    };

  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

/**
 * Get optimized image URL with transformations
 */
export function getOptimizedImageUrl(
  imageUrl: string,
  options: ImageTransformOptions = {}
): string {
  if (!imageUrl) return '';
  
  // If it's already a Supabase Storage URL, use their image transformation
  if (imageUrl.includes('supabase')) {
    const url = new URL(imageUrl);
    const params = new URLSearchParams();
    
    if (options.width) params.append('width', options.width.toString());
    if (options.height) params.append('height', options.height.toString());
    if (options.quality) params.append('quality', options.quality.toString());
    if (options.format) params.append('format', options.format);
    if (options.fit) params.append('fit', options.fit);
    
    if (params.toString()) {
      url.search = params.toString();
    }
    
    return url.toString();
  }
  
  // For external URLs, return as-is (you might want to use a different CDN service)
  return imageUrl;
}

/**
 * Delete image from Supabase Storage
 */
export async function deleteImage(
  imagePath: string,
  bucket: string = 'images'
): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([imagePath]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}

/**
 * Get image info from URL
 */
export async function getImageInfo(imageUrl: string): Promise<{
  width: number;
  height: number;
  size: number;
  format: string;
} | null> {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    if (!response.ok) return null;

    const contentType = response.headers.get('content-type') || '';
    const contentLength = response.headers.get('content-length');
    
    // For Supabase images, we can get dimensions from the URL
    if (imageUrl.includes('supabase')) {
      const url = new URL(imageUrl);
      const width = url.searchParams.get('width');
      const height = url.searchParams.get('height');
      
      return {
        width: width ? parseInt(width) : 0,
        height: height ? parseInt(height) : 0,
        size: contentLength ? parseInt(contentLength) : 0,
        format: contentType.split('/')[1] || 'unknown'
      };
    }

    return {
      width: 0,
      height: 0,
      size: contentLength ? parseInt(contentLength) : 0,
      format: contentType.split('/')[1] || 'unknown'
    };

  } catch (error) {
    console.error('Image info error:', error);
    return null;
  }
}

/**
 * Validate image URL
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const validProtocols = ['http:', 'https:'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    
    if (!validProtocols.includes(urlObj.protocol)) return false;
    
    const pathname = urlObj.pathname.toLowerCase();
    return validExtensions.some(ext => pathname.endsWith(ext));
  } catch {
    return false;
  }
}

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(
  baseUrl: string,
  sizes: { [key: string]: { width: number; height?: number } } = {
    sm: { width: 640 },
    md: { width: 768 },
    lg: { width: 1024 },
    xl: { width: 1280 },
    '2xl': { width: 1536 }
  }
): { [key: string]: string } {
  const urls: { [key: string]: string } = {};
  
  Object.entries(sizes).forEach(([size, options]) => {
    urls[size] = getOptimizedImageUrl(baseUrl, options);
  });
  
  return urls;
}

/**
 * Create Supabase Storage bucket if it doesn't exist
 */
export async function createImageBucket(bucketName: string = 'images'): Promise<boolean> {
  try {
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
      fileSizeLimit: 10 * 1024 * 1024 // 10MB limit
    });

    if (error && !error.message.includes('already exists')) {
      console.error('Bucket creation error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Bucket creation error:', error);
    return false;
  }
}

/**
 * Get all images from a bucket
 */
export async function listImages(
  bucket: string = 'images',
  folder: string = '',
  limit: number = 100
): Promise<{ name: string; url: string; size: number; updated_at: string }[]> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error('List images error:', error);
      return [];
    }

    return data.map(file => ({
      name: file.name,
      url: getOptimizedImageUrl(
        supabase.storage.from(bucket).getPublicUrl(`${folder}/${file.name}`).data.publicUrl
      ),
      size: file.metadata?.size || 0,
      updated_at: file.updated_at || file.created_at
    }));

  } catch (error) {
    console.error('List images error:', error);
    return [];
  }
}
