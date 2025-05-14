
/**
 * Mock file upload service - simulates a file upload API 
 * by storing files in the browser's memory
 */

// Store for uploaded files
type UploadedFile = {
  id: string;
  file: File;
  url: string;
};

class MockFileUploadService {
  private static instance: MockFileUploadService;
  private uploadedFiles: UploadedFile[] = [];
  
  private constructor() {}
  
  public static getInstance(): MockFileUploadService {
    if (!MockFileUploadService.instance) {
      MockFileUploadService.instance = new MockFileUploadService();
    }
    return MockFileUploadService.instance;
  }
  
  public async uploadFile(file: File): Promise<{ url: string; id: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create blob URL
    const url = URL.createObjectURL(file);
    const id = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Store the file
    this.uploadedFiles.push({ id, file, url });
    
    return { url, id };
  }
  
  public getFile(id: string): UploadedFile | undefined {
    return this.uploadedFiles.find(f => f.id === id);
  }
}

export const mockUploadService = MockFileUploadService.getInstance();
