
import { githubFileUploadService } from './githubFileUpload';
import { imageStorageService } from './imageStorage';

/**
 * File upload service - now uploads to GitHub repository
 */

class FileUploadService {
  private static instance: FileUploadService;
  
  private constructor() {}
  
  public static getInstance(): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService();
    }
    return FileUploadService.instance;
  }
  
  public async uploadFile(file: File): Promise<{ url: string; id: string }> {
    console.log('Starting file upload to GitHub repository...');
    
    // Store image metadata
    const imageInfo = await imageStorageService.storeImage(file);
    
    // Upload to GitHub
    const githubResult = await githubFileUploadService.uploadToGitHub(file);
    
    if (!githubResult.success) {
      throw new Error(githubResult.error || 'Failed to upload to GitHub');
    }
    
    console.log('File successfully uploaded to GitHub:', {
      url: imageInfo.url,
      githubPath: imageInfo.githubPath,
      id: imageInfo.id
    });
    
    return {
      url: imageInfo.url,
      id: imageInfo.id
    };
  }
}

export const mockUploadService = FileUploadService.getInstance();
