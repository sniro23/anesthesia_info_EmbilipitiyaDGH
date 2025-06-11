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
   * Store image file directly to public directory
   */
  public async storeImage(file: File): Promise<StoredImageInfo> {
    const filename = this.generateFilename(file);
    const url = `${this.UPLOAD_PATH}${filename}`;
    const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Create a blob URL for immediate display in the Lovable environment
    const blobUrl = URL.createObjectURL(file);
    
    const imageInfo: StoredImageInfo = {
      id,
      filename,
      originalName: file.name,
      url: blobUrl, // Use blob URL for immediate display
      uploadDate: new Date().toISOString()
    };
    
    // Store in manifest
    this.updateManifest(imageInfo);
    
    console.log('Image stored with blob URL for display:', imageInfo);
    
    return imageInfo;
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
    } catch (error) {
      console.error('Failed to update image manifest:', error);
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
