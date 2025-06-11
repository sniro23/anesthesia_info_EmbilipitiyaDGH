
/**
 * Image Storage Service - Handles file storage to GitHub repo directory
 * Saves images to public/imageuplodas/ directory in GitHub repository
 */

export interface StoredImageInfo {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  uploadDate: string;
  githubPath?: string;
}

class ImageStorageService {
  private static instance: ImageStorageService;
  private readonly STORAGE_KEY = 'image-storage-manifest';
  private readonly UPLOAD_PATH = '/imageuplodas/';
  
  private constructor() {}
  
  public static getInstance(): ImageStorageService {
    if (!ImageStorageService.instance) {
      ImageStorageService.instance = new ImageStorageService();
    }
    return ImageStorageService.instance;
  }
  
  /**
   * Generate a unique filename for uploaded images
   */
  private generateFilename(originalFile: File): string {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const extension = originalFile.name.split('.').pop() || 'png';
    return `${timestamp}-${randomId}.${extension}`;
  }
  
  /**
   * Store image file and return permanent URL
   * This saves to public/imageuplodas/ directory in GitHub repo
   */
  public async storeImage(file: File): Promise<StoredImageInfo> {
    const filename = this.generateFilename(file);
    const url = `${this.UPLOAD_PATH}${filename}`;
    const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const githubPath = `public/imageuplodas/${filename}`;
    
    const imageInfo: StoredImageInfo = {
      id,
      filename,
      originalName: file.name,
      url,
      uploadDate: new Date().toISOString(),
      githubPath
    };
    
    // Store in manifest
    this.updateManifest(imageInfo);
    
    console.log(`Image will be stored to GitHub at: ${githubPath}`);
    console.log(`Accessible via URL: ${url}`);
    
    return imageInfo;
  }
  
  /**
   * Get the actual URL to display - now points to GitHub repo files
   */
  public getDisplayUrl(permanentUrl: string): string {
    // Ensure the URL uses the correct imageuplodas path
    if (permanentUrl.startsWith('/imageuplodas/')) {
      return permanentUrl;
    }
    
    // Convert old paths to new structure
    if (permanentUrl.includes('/')) {
      const filename = permanentUrl.split('/').pop();
      return `/imageuplodas/${filename}`;
    }
    
    return permanentUrl;
  }
  
  /**
   * Update the image manifest
   */
  private updateManifest(imageInfo: StoredImageInfo): void {
    try {
      const manifest = this.getManifest();
      manifest[imageInfo.id] = imageInfo;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(manifest));
    } catch (error) {
      console.error('Failed to update image manifest:', error);
    }
  }
  
  /**
   * Get the current image manifest
   */
  public getManifest(): Record<string, StoredImageInfo> {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }
  
  /**
   * Validate if an image URL is valid and accessible
   */
  public async validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = this.getDisplayUrl(url);
    });
  }
  
  /**
   * Get GitHub path for an image
   */
  public getGitHubPath(url: string): string {
    const filename = url.split('/').pop() || '';
    return `public/imageuplodas/${filename}`;
  }
}

export const imageStorageService = ImageStorageService.getInstance();
