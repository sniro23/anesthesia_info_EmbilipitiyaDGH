
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
    console.log('FileUploadService: Starting saveFile for:', file.name, file.size, file.type);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate filename and path
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 9);
      const extension = file.name.split('.').pop() || 'png';
      const filename = `${timestamp}-${randomId}.${extension}`;
      const url = `/lovable-uploads/${filename}`;
      
      console.log('FileUploadService: Generated filename:', filename);
      console.log('FileUploadService: Generated URL:', url);
      
      // Store the image info with proper file path
      console.log('FileUploadService: Calling imageStorageService.storeImage...');
      const imageInfo = await imageStorageService.storeImage(file);
      
      console.log('FileUploadService: Image stored successfully:', imageInfo);
      
      // Use the URL from imageInfo but ensure it's properly formatted
      const finalUrl = imageInfo.url || url;
      
      console.log('FileUploadService: Final URL:', finalUrl);
      
      return {
        url: finalUrl,
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
