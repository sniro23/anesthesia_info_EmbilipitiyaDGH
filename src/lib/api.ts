
import { githubFileUploadService } from './githubFileUpload';

// Mock API response types
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// File Upload API - simulates GitHub upload for development
export const uploadFile = async (file: File): Promise<ApiResponse<{ url: string; id: string }>> => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    
    // Check file size (max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      throw new Error('File size exceeds 5MB limit');
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('File type not supported. Please upload a JPG, PNG, or GIF image.');
    }
    
    console.log('Starting simulated GitHub upload for file:', file.name);
    
    // Upload the file using GitHub service
    const result = await githubFileUploadService.uploadToGitHub(file);
    
    if (!result.success) {
      throw new Error(result.error || 'Upload failed');
    }
    
    console.log('Simulated GitHub upload successful:', result);
    
    return {
      success: true,
      data: {
        url: result.url,
        id: result.id
      }
    };
  } catch (error) {
    console.error('Upload API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
