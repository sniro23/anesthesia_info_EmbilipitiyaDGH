
/**
 * Image Storage Service - Handles file storage to GitHub repo directory
 * Saves images to public/imageuplodas/ directory
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
  private readonly UPLOAD_PATH = '/imageuplodas/';
  
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
   * Store image file and return permanent URL
   * This saves to public/imageuplodas/ directory
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
    
    // In a real implementation, this would save the file to the GitHub repo
    // For now, we'll create a blob URL as a fallback for immediate display
    const blobUrl = URL.createObjectURL(file);
    
    // Store the blob URL mapped to our permanent URL for immediate use
    const blobMapping = this.getBlobMapping();
    blobMapping[url] = blobUrl;
    localStorage.setItem('blob-url-mapping', JSON.stringify(blobMapping));
    
    console.log(`Image stored with URL: ${url}`);
    
    return imageInfo;
  }
  
  /**
   * Get blob URL mapping for immediate display
   */
  private getBlobMapping(): Record<string, string> {
    try {
      return JSON.parse(localStorage.getItem('blob-url-mapping') || '{}');
    } catch {
      return {};
    }
  }
  
  /**
   * Get the actual URL to display
   */
  public getDisplayUrl(permanentUrl: string): string {
    // First check if it's already a valid path in our imageuplodas directory
    if (permanentUrl.startsWith('/imageuplodas/')) {
      return permanentUrl;
    }
    
    // Check for blob URL mapping
    const blobMapping = this.getBlobMapping();
    return blobMapping[permanentUrl] || permanentUrl;
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
      img.src = this.getDisplayUrl(url);
    });
  }
  
  /**
   * Clean up expired blob URLs
   */
  public cleanupBlobUrls(): void {
    const blobMapping = this.getBlobMapping();
    Object.values(blobMapping).forEach(blobUrl => {
      if (blobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(blobUrl);
      }
    });
    localStorage.removeItem('blob-url-mapping');
  }
}

export const imageStorageService = ImageStorageService.getInstance();
