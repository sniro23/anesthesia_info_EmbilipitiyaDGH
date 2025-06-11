
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
    
    const imageInfo: StoredImageInfo = {
      id,
      filename,
      originalName: file.name,
      url,
      uploadDate: new Date().toISOString()
    };
    
    // Store in manifest
    this.updateManifest(imageInfo);
    
    return imageInfo;
  }
  
  /**
   * Get the display URL (always return the permanent URL now)
   */
  public getDisplayUrl(permanentUrl: string): string {
    return permanentUrl;
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
   * Validate if an image URL is valid and accessible
   */
  public async validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
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
   * Clean up - no longer needed as we don't use blob URLs
   */
  public cleanupBlobUrls(): void {
    // No-op now that we use real files
    console.log('Cleanup not needed - using real file storage');
  }
}

export const imageStorageService = ImageStorageService.getInstance();
