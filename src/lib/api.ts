
import { mockUploadService } from './mockFileUpload';

// Mock API response types
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Mock API for file uploads
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
    
    // Upload the file using our mock service
    const result = await mockUploadService.uploadFile(file);
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
