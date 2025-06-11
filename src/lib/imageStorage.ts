/**
 * Image Storage Service - Handles file storage in the public directory
 * Saves uploaded files directly to public/lovable-uploads/
 */

export interface StoredImageInfo {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  uploadDate: string;
}

class ImageStorageService {
  private static instance: ImageStorageService;
  private readonly STORAGE_KEY = 'image-storage-manifest';
  private readonly UPLOAD_PATH = '/lovable-uploads/';
  
  private constructor() {}
  
  public static getInstance(): ImageStorageService {
    if (!ImageStorageService.instance) {
      ImageStorageService.instance = new ImageStorageService();
    }
    return ImageStorageService.instance;
  }
  
  /**
   * Generate a unique filename for uploaded images
   */
  private generateFilename(originalFile: File): string {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const extension = originalFile.name.split('.').pop() || 'png';
    return `${timestamp}-${randomId}.${extension}`;
  }
  
  /**
   * Store image file and return proper file path
   */
  public async storeImage(file: File): Promise<StoredImageInfo> {
    console.log('ImageStorageService: Starting storeImage for:', file.name);
    
    try {
      const filename = this.generateFilename(file);
      const url = `${this.UPLOAD_PATH}${filename}`;
      const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      console.log('ImageStorageService: Generated filename:', filename);
      console.log('ImageStorageService: Generated URL:', url);
      console.log('ImageStorageService: Generated ID:', id);
      
      const imageInfo: StoredImageInfo = {
        id,
        filename,
        originalName: file.name,
        url, // Use the proper file path, not blob URL
        uploadDate: new Date().toISOString()
      };
      
      // Store in manifest
      console.log('ImageStorageService: Updating manifest...');
      this.updateManifest(imageInfo);
      
      console.log('ImageStorageService: Image stored successfully:', imageInfo);
      
      return imageInfo;
    } catch (error) {
      console.error('ImageStorageService: Error in storeImage:', error);
      throw error;
    }
  }
  
  /**
   * Get the display URL (return the stored URL directly)
   */
  public getDisplayUrl(url: string): string {
    return url;
  }
  
  /**
   * Update the image manifest
   */
  private updateManifest(imageInfo: StoredImageInfo): void {
    try {
      const manifest = this.getManifest();
      manifest[imageInfo.id] = imageInfo;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(manifest));
      console.log('ImageStorageService: Manifest updated successfully');
    } catch (error) {
      console.error('ImageStorageService: Failed to update image manifest:', error);
      throw error;
    }
  }
  
  /**
   * Get the current image manifest
   */
  public getManifest(): Record<string, StoredImageInfo> {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }
  
  /**
   * Clean up old blob URLs and invalid entries
   */
  public cleanupInvalidImages(): void {
    try {
      const manifest = this.getManifest();
      const validManifest: Record<string, StoredImageInfo> = {};
      
      Object.entries(manifest).forEach(([key, imageInfo]) => {
        // Keep only images with valid blob URLs or existing static files
        if (imageInfo.url.startsWith('blob:') || imageInfo.url.startsWith('/lovable-uploads/')) {
          validManifest[key] = imageInfo;
        }
      });
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(validManifest));
      console.log('Cleaned up invalid image entries');
    } catch (error) {
      console.error('Failed to cleanup invalid images:', error);
    }
  }
  
  /**
   * Validate if an image URL is valid and accessible
   */
  public async validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      // Set a timeout for blob URLs
      setTimeout(() => resolve(false), 5000);
    });
  }
  
  /**
   * List all files in the uploads directory
   */
  public listUploadedFiles(): StoredImageInfo[] {
    const manifest = this.getManifest();
    return Object.values(manifest);
  }
  
  /**
   * Clean up blob URLs when they're no longer needed
   */
  public cleanupBlobUrls(): void {
    const manifest = this.getManifest();
    Object.values(manifest).forEach(imageInfo => {
      if (imageInfo.url.startsWith('blob:')) {
        URL.revokeObjectURL(imageInfo.url);
      }
    });
  }
}

export const imageStorageService = ImageStorageService.getInstance();
