
import { fileUploadService } from './fileUploadService';

/**
 * Mock file upload service - now saves files directly to public directory
 */

class MockFileUploadService {
  private static instance: MockFileUploadService;
  
  private constructor() {}
  
  public static getInstance(): MockFileUploadService {
    if (!MockFileUploadService.instance) {
      MockFileUploadService.instance = new MockFileUploadService();
    }
    return MockFileUploadService.instance;
  }
  
  public async uploadFile(file: File): Promise<{ url: string; id: string }> {
    console.log('MockFileUploadService: Starting upload for file:', file.name);
    
    try {
      // Validate the file first
      console.log('MockFileUploadService: Validating file...');
      const validation = fileUploadService.validateFile(file);
      if (!validation.valid) {
        console.error('MockFileUploadService: File validation failed:', validation.error);
        throw new Error(validation.error);
      }
      console.log('MockFileUploadService: File validation passed');
      
      // Save the file using our file upload service
      console.log('MockFileUploadService: Calling fileUploadService.saveFile...');
      const result = await fileUploadService.saveFile(file);
      
      console.log('MockFileUploadService: File uploaded successfully:', result);
      
      return result;
    } catch (error) {
      console.error('MockFileUploadService: Upload failed with error:', error);
      throw error;
    }
  }
}

export const mockUploadService = MockFileUploadService.getInstance();
