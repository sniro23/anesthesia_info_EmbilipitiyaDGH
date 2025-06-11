
/**
 * File Upload Service - Handles saving files to uploads directory
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
   * Save file to uploads directory
   */
  public async saveFile(file: File): Promise<{ url: string; id: string }> {
    console.log('FileUploadService: Starting saveFile for:', file.name, file.size, file.type);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('FileUploadService: Calling imageStorageService.storeImage...');
      const imageInfo = await imageStorageService.storeImage(file);
      
      console.log('FileUploadService: Image stored successfully at:', imageInfo.url);
      
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
    
    // Check file size (max 5MB)
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
    
    console.log('FileUploadService: File validation passed');
    return { valid: true };
  }
}

export const fileUploadService = FileUploadService.getInstance();
