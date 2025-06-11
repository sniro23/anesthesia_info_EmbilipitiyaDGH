
/**
 * GitHub File Upload Service - Saves files directly to GitHub repository
 */

export interface UploadResult {
  url: string;
  id: string;
  success: boolean;
  error?: string;
}

class GitHubFileUploadService {
  private static instance: GitHubFileUploadService;
  
  private constructor() {}
  
  public static getInstance(): GitHubFileUploadService {
    if (!GitHubFileUploadService.instance) {
      GitHubFileUploadService.instance = new GitHubFileUploadService();
    }
    return GitHubFileUploadService.instance;
  }
  
  /**
   * Upload file to GitHub repository
   */
  public async uploadToGitHub(file: File): Promise<UploadResult> {
    try {
      // Generate unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 9);
      const extension = file.name.split('.').pop() || 'png';
      const filename = `${timestamp}-${randomId}.${extension}`;
      const filePath = `public/imageuplodas/${filename}`;
      
      // Convert file to base64
      const base64Content = await this.fileToBase64(file);
      
      // Create the file in GitHub using fetch
      const response = await fetch('/api/github/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: filePath,
          content: base64Content,
          message: `Add image: ${filename}`,
          filename: filename
        })
      });
      
      if (!response.ok) {
        throw new Error(`GitHub upload failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      return {
        url: `/imageuplodas/${filename}`,
        id: `img-${timestamp}-${randomId}`,
        success: true
      };
      
    } catch (error) {
      console.error('GitHub upload error:', error);
      return {
        url: '',
        id: '',
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }
  
  /**
   * Convert file to base64
   */
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove data URL prefix (data:image/png;base64,)
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
}

export const githubFileUploadService = GitHubFileUploadService.getInstance();
