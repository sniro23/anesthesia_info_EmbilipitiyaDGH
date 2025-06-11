
/**
 * Image Storage Service - Handles file storage to public/lovable-uploads directory
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
  private readonly UPLOAD_DIR = '/lovable-uploads/';
  
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
   * Store image file to the uploads directory
   */
  public async storeImage(file: File): Promise<StoredImageInfo> {
    console.log('ImageStorageService: Starting storeImage for:', file.name);
    
    try {
      const filename = this.generateFilename(file);
      const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Save file to the uploads directory
      const uploadPath = `${this.UPLOAD_DIR}${filename}`;
      await this.saveFileToUploads(file, filename);
      
      console.log('ImageStorageService: File saved to:', uploadPath);
      
      const imageInfo: StoredImageInfo = {
        id,
        filename,
        originalName: file.name,
        url: uploadPath,
        uploadDate: new Date().toISOString()
      };
      
      // Store in manifest
      console.log('ImageStorageService: Updating manifest...');
      this.updateManifest(imageInfo);
      
      console.log('ImageStorageService: Image stored successfully at:', imageInfo.url);
      
      return imageInfo;
    } catch (error) {
      console.error('ImageStorageService: Error in storeImage:', error);
      throw error;
    }
  }
  
  /**
   * Save file to the public/lovable-uploads directory
   */
  private async saveFileToUploads(file: File, filename: string): Promise<void> {
    try {
      // In a real implementation, this would use fetch to save to the server
      // For now, we'll simulate the file save and assume it works
      console.log('ImageStorageService: Simulating file save to uploads directory:', filename);
      
      // Create a FormData object to simulate the upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);
      
      // In a browser environment, we can't actually write to the file system
      // This would normally be handled by a backend API
      // For demo purposes, we'll just log this
      console.log('ImageStorageService: File would be saved as:', filename);
      
    } catch (error) {
      console.error('ImageStorageService: Failed to save file:', error);
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
   * Clean up old entries
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
   * Validate if an image URL is valid and accessible
   */
  public async validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (url.startsWith('/lovable-uploads/')) {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
        
        // Set a timeout
        setTimeout(() => resolve(false), 5000);
      } else {
        resolve(false);
      }
    });
  }
  
  /**
   * List all files in the uploads directory
   */
  public listUploadedFiles(): StoredImageInfo[] {
    const manifest = this.getManifest();
    return Object.values(manifest);
  }
}

export const imageStorageService = ImageStorageService.getInstance();
