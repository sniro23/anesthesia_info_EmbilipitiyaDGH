
/**
 * File Upload Service - Handles saving files to public directory
 */

import { imageStorageService } from './imageStorage';

class FileUploadService {
  private static instance: FileUploadService;
  
  private constructor() {}
  
  public static getInstance(): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService();
    }
    return FileUploadService.instance;
  }
  
  /**
   * Save file to public directory
   */
  public async saveFile(file: File): Promise<{ url: string; id: string }> {
    console.log('FileUploadService: Starting saveFile for:', file.name, file.size, file.type);
    
    try {
      // Check storage quota before proceeding
      const storageInfo = imageStorageService.checkStorageQuota();
      if (!storageInfo.available) {
        throw new Error('Storage quota exceeded. Please clear some space and try again.');
      }
      
      console.log('FileUploadService: Calling imageStorageService.storeImage...');
      const imageInfo = await imageStorageService.storeImage(file);
      
      console.log('FileUploadService: Image stored successfully');
      
      return {
        url: imageInfo.url,
        id: imageInfo.id
      };
    } catch (error) {
      console.error('FileUploadService: Error in saveFile:', error);
      throw error;
    }
  }
  
  /**
   * Validate file before upload
   */
  public validateFile(file: File): { valid: boolean; error?: string } {
    console.log('FileUploadService: Validating file:', file.name, file.size, file.type);
    
    // Check file size (max 5MB for individual files)
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      console.error('FileUploadService: File too large:', file.size, 'bytes');
      return { valid: false, error: 'File size exceeds 5MB limit' };
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      console.error('FileUploadService: Invalid file type:', file.type);
      return { valid: false, error: 'File type not supported. Please upload a JPG, PNG, GIF, or WebP image.' };
    }
    
    // Check storage quota
    const storageInfo = imageStorageService.checkStorageQuota();
    if (!storageInfo.available) {
      console.error('FileUploadService: Storage quota exceeded');
      return { valid: false, error: 'Storage quota exceeded. Please clear some space and try again.' };
    }
    
    console.log('FileUploadService: File validation passed');
    return { valid: true };
  }
  
  /**
   * Get storage usage information
   */
  public getStorageInfo(): { available: boolean; used: number; quota: number } {
    return imageStorageService.checkStorageQuota();
  }
}

export const fileUploadService = FileUploadService.getInstance();
