/**
 * Image Storage Service - Handles file storage using blob URLs
 */

export interface StoredImageInfo {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  uploadDate: string;
  file?: File; // Store the actual file for blob URL generation
}

class ImageStorageService {
  private static instance: ImageStorageService;
  private readonly STORAGE_KEY = 'image-storage-manifest';
  private blobUrls: Map<string, string> = new Map(); // Track blob URLs for cleanup
  
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
   * Store image file and return blob URL for immediate use
   */
  public async storeImage(file: File): Promise<StoredImageInfo> {
    console.log('ImageStorageService: Starting storeImage for:', file.name);
    
    try {
      const filename = this.generateFilename(file);
      const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Create blob URL for immediate display
      const blobUrl = URL.createObjectURL(file);
      console.log('ImageStorageService: Created blob URL:', blobUrl);
      
      // Store the blob URL for cleanup tracking
      this.blobUrls.set(id, blobUrl);
      
      const imageInfo: StoredImageInfo = {
        id,
        filename,
        originalName: file.name,
        url: blobUrl, // Use blob URL for immediate display
        uploadDate: new Date().toISOString(),
        file // Store file reference for potential future use
      };
      
      // Store in manifest (without the file object to avoid serialization issues)
      console.log('ImageStorageService: Updating manifest...');
      const manifestEntry = { ...imageInfo };
      delete manifestEntry.file; // Remove file from manifest storage
      this.updateManifest(manifestEntry);
      
      console.log('ImageStorageService: Image stored successfully with blob URL:', imageInfo.url);
      
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
  private updateManifest(imageInfo: Omit<StoredImageInfo, 'file'>): void {
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
        // Keep all images since we're now using blob URLs
        if (imageInfo.url) {
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
      if (url.startsWith('blob:')) {
        // For blob URLs, we can't really validate without trying to load
        resolve(true);
        return;
      }
      
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      // Set a timeout
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
   * Clean up specific blob URL
   */
  public cleanupBlobUrl(id: string): void {
    const blobUrl = this.blobUrls.get(id);
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      this.blobUrls.delete(id);
      console.log('Cleaned up blob URL for image:', id);
    }
  }
  
  /**
   * Clean up all blob URLs
   */
  public cleanupBlobUrls(): void {
    this.blobUrls.forEach((blobUrl, id) => {
      URL.revokeObjectURL(blobUrl);
      console.log('Cleaned up blob URL:', blobUrl);
    });
    this.blobUrls.clear();
  }
}

export const imageStorageService = ImageStorageService.getInstance();
