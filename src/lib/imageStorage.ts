/**
 * Image Storage Service - Handles file storage directly to public directory
 */

import { fileSystemHandler } from './fileSystemHandler';

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
   * Store image file directly to public directory
   */
  public async storeImage(file: File): Promise<StoredImageInfo> {
    console.log('ImageStorageService: Starting storeImage for:', file.name);
    
    try {
      const filename = this.generateFilename(file);
      const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Save file using file system handler
      const url = await fileSystemHandler.saveToUploads(file, filename);
      
      console.log('ImageStorageService: File saved successfully');
      
      const imageInfo: StoredImageInfo = {
        id,
        filename,
        originalName: file.name,
        url,
        uploadDate: new Date().toISOString()
      };
      
      // Store only metadata in manifest (not the actual image data)
      console.log('ImageStorageService: Updating manifest with metadata only...');
      this.updateManifest(imageInfo);
      
      console.log('ImageStorageService: Image stored successfully');
      
      return imageInfo;
    } catch (error) {
      console.error('ImageStorageService: Error in storeImage:', error);
      throw error;
    }
  }
  
  /**
   * Get the display URL with fallback to temp URL if needed
   */
  public getDisplayUrl(url: string): string {
    // Try to get temp URL first for immediate display
    const tempUrl = fileSystemHandler.getTempUrl(url);
    return tempUrl || url;
  }
  
  /**
   * Update the image manifest (metadata only, no image data)
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
   * Clean up old entries and check storage usage
   */
  public cleanupInvalidImages(): void {
    try {
      const manifest = this.getManifest();
      const validManifest: Record<string, StoredImageInfo> = {};
      
      Object.entries(manifest).forEach(([key, imageInfo]) => {
        if (imageInfo.url && imageInfo.url.startsWith('/lovable-uploads/')) {
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
        available: usedPercentage < 90, // Consider 90% as the safe limit
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
      if (url.startsWith('/lovable-uploads/')) {
        // For local uploads, try to load the image
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
        
        // Set a timeout
        setTimeout(() => resolve(false), 5000);
      } else if (url.startsWith('data:') || url.startsWith('blob:')) {
        resolve(true);
      } else {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
        
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
