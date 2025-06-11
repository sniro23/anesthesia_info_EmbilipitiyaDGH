
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
    // Validate the file first
    const validation = fileUploadService.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    
    // Save the file using our file upload service
    const result = await fileUploadService.saveFile(file);
    
    console.log('File uploaded successfully:', result);
    
    return result;
  }
}

export const mockUploadService = MockFileUploadService.getInstance();
