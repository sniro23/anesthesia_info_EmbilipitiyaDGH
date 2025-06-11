/**
 * File Upload Service - Handles saving files to the public directory
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
   * Save file to the public directory and return the file info
   */
  public async saveFile(file: File): Promise<{ url: string; id: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate filename and path
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const extension = file.name.split('.').pop() || 'png';
    const filename = `${timestamp}-${randomId}.${extension}`;
    const url = `/lovable-uploads/${filename}`;
    
    // Store the image info with proper file path
    const imageInfo = await imageStorageService.storeImage(file);
    
    console.log('File saved with path:', url);
    
    return {
      url: url, // Return the proper file path
      id: imageInfo.id
    };
  }
  
  /**
   * Validate file before upload
   */
  public validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size (max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return { valid: false, error: 'File size exceeds 5MB limit' };
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File type not supported. Please upload a JPG, PNG, GIF, or WebP image.' };
    }
    
    return { valid: true };
  }
}

export const fileUploadService = FileUploadService.getInstance();
