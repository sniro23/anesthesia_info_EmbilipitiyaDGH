/**
 * Image Storage Service - Handles image storage using data URLs
 */

export interface StoredImageInfo {
  id: string;
  filename: string;
  originalName: string;
  url: string; // This will be a data URL
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
   * Convert file to data URL for reliable storage
   */
  private async fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to data URL'));
        }
      };
      reader.onerror = () => reject(new Error('FileReader error'));
      reader.readAsDataURL(file);
    });
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
   * Store image as data URL in localStorage
   */
  public async storeImage(file: File): Promise<StoredImageInfo> {
    console.log('ImageStorageService: Starting storeImage for:', file.name);
    
    try {
      // Convert file to data URL
      const dataUrl = await this.fileToDataUrl(file);
      
      const filename = this.generateFilename(file);
      const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
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
   * Get the display URL (data URL is already ready for display)
   */
  public getDisplayUrl(url: string): string {
    return url; // Data URLs are already ready for display
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
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        throw new Error('Storage quota exceeded. Please remove some images and try again.');
      }
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
        // Keep all data URLs and valid image URLs
        if (imageInfo.url && (imageInfo.url.startsWith('data:') || imageInfo.url.startsWith('http'))) {
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
   * Check storage quota before upload
   */
  public checkStorageQuota(): { available: boolean; used: number; quota: number } {
    try {
      // Estimate current localStorage usage
      let totalSize = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length;
        }
      }
      
      // Most browsers have ~5-10MB localStorage limit
      const estimatedQuota = 10 * 1024 * 1024; // 10MB
      const usedPercentage = (totalSize / estimatedQuota) * 100;
      
      console.log(`Storage usage: ${totalSize} bytes (${usedPercentage.toFixed(1)}%)`);
      
      return {
        available: usedPercentage < 85, // Consider 85% as the safe limit
        used: totalSize,
        quota: estimatedQuota
      };
    } catch (error) {
      console.error('Failed to check storage quota:', error);
      return { available: false, used: 0, quota: 0 };
    }
  }
  
  /**
   * Validate if an image URL is valid and accessible
   */
  public async validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (url.startsWith('data:')) {
        // Data URLs are always valid if they start with data:
        resolve(true);
      } else if (url.startsWith('blob:')) {
        resolve(true);
      } else if (url.startsWith('http://') || url.startsWith('https://')) {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
        
        setTimeout(() => resolve(false), 5000);
      } else {
        resolve(false);
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
