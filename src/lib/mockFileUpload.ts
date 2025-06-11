
import { imageStorageService } from './imageStorage';

/**
 * Mock file upload service - now integrated with proper image storage
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
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Use our new image storage service
    const imageInfo = await imageStorageService.storeImage(file);
    
    console.log('File uploaded successfully:', imageInfo);
    
    return {
      url: imageInfo.url,
      id: imageInfo.id
    };
  }
}

export const mockUploadService = MockFileUploadService.getInstance();
