
/**
 * Image Storage Service - Handles file storage using data URLs for browser compatibility
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
   * Store image file - convert to data URL for browser storage
   */
  public async storeImage(file: File): Promise<StoredImageInfo> {
    console.log('ImageStorageService: Starting storeImage for:', file.name);
    
    try {
      const filename = this.generateFilename(file);
      const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Convert file to data URL for reliable browser storage
      const dataUrl = await this.fileToDataUrl(file);
      
      console.log('ImageStorageService: File converted to data URL successfully');
      
      const imageInfo: StoredImageInfo = {
        id,
        filename,
        originalName: file.name,
        url: dataUrl,
        uploadDate: new Date().toISOString()
      };
      
      // Store in manifest
      console.log('ImageStorageService: Updating manifest...');
      this.updateManifest(imageInfo);
      
      console.log('ImageStorageService: Image stored successfully');
      
      return imageInfo;
    } catch (error) {
      console.error('ImageStorageService: Error in storeImage:', error);
      throw error;
    }
  }
  
  /**
   * Convert file to data URL
   */
  private fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as data URL'));
        }
      };
      reader.onerror = () => reject(new Error('File read error'));
      reader.readAsDataURL(file);
    });
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
   * Clean up old entries
   */
  public cleanupInvalidImages(): void {
    try {
      const manifest = this.getManifest();
      const validManifest: Record<string, StoredImageInfo> = {};
      
      Object.entries(manifest).forEach(([key, imageInfo]) => {
        if (imageInfo.url && (imageInfo.url.startsWith('data:') || imageInfo.url.startsWith('blob:'))) {
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
      if (url.startsWith('data:') || url.startsWith('blob:')) {
        resolve(true);
      } else {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
        
        // Set a timeout
        setTimeout(() => resolve(false), 5000);
      }
    });
  }
  
  /**
   * List all files in storage
   */
  public listUploadedFiles(): StoredImageInfo[] {
    const manifest = this.getManifest();
    return Object.values(manifest);
  }
}

export const imageStorageService = ImageStorageService.getInstance();
