
import { mockUploadService } from './mockFileUpload';

// API response types
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// API for file uploads with direct file storage
export const uploadFile = async (file: File): Promise<ApiResponse<{ url: string; id: string }>> => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    
    // Upload the file using our improved service that saves files directly
    const result = await mockUploadService.uploadFile(file);
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Upload API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
