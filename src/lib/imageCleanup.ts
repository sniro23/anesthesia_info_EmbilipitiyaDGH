
/**
 * Image Cleanup Utility - Removes invalid image references from localStorage
 */

interface StoredImageInfo {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  uploadDate: string;
}

class ImageCleanupService {
  private static instance: ImageCleanupService;
  private readonly STORAGE_KEY = 'anesthesia-site-images';
  
  private constructor() {}
  
  public static getInstance(): ImageCleanupService {
    if (!ImageCleanupService.instance) {
      ImageCleanupService.instance = new ImageCleanupService();
    }
    return ImageCleanupService.instance;
  }
  
  /**
   * Validate if an image URL is potentially valid
   */
  private isValidImageUrl(url: string): boolean {
    if (!url) return false;
    
    // Allow various valid formats
    if (url.startsWith('blob:')) return true;
    if (url.startsWith('data:')) return true;
    if (url.startsWith('/lovable-uploads/')) return true;
    if (url.startsWith('http://') || url.startsWith('https://')) return true;
    if (url === '/placeholder.svg') return true;
    
    return false;
  }
  
  /**
   * Clean up invalid image references from all sections
   */
  public cleanupInvalidImages(): { removed: number; cleaned: number } {
    try {
      const savedImages = localStorage.getItem(this.STORAGE_KEY);
      if (!savedImages) return { removed: 0, cleaned: 0 };
      
      const imageData = JSON.parse(savedImages);
      let totalRemoved = 0;
      let sectionsChanged = 0;
      
      Object.keys(imageData).forEach(sectionId => {
        const images = imageData[sectionId];
        if (!Array.isArray(images)) return;
        
        const originalLength = images.length;
        const validImages = images.filter((image: any) => {
          if (!image || typeof image !== 'object') return false;
          if (!this.isValidImageUrl(image.src)) {
            console.log('Removing invalid image:', image.src);
            return false;
          }
          return true;
        });
        
        const removed = originalLength - validImages.length;
        if (removed > 0) {
          imageData[sectionId] = validImages;
          totalRemoved += removed;
          sectionsChanged++;
          console.log(`Cleaned ${removed} invalid images from section ${sectionId}`);
        }
      });
      
      if (totalRemoved > 0) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(imageData));
        console.log(`Cleanup complete: removed ${totalRemoved} invalid images from ${sectionsChanged} sections`);
      }
      
      return { removed: totalRemoved, cleaned: sectionsChanged };
      
    } catch (error) {
      console.error('Failed to cleanup invalid images:', error);
      return { removed: 0, cleaned: 0 };
    }
  }
  
  /**
   * Get statistics about stored images
   */
  public getImageStats(): { totalSections: number; totalImages: number; validImages: number } {
    try {
      const savedImages = localStorage.getItem(this.STORAGE_KEY);
      if (!savedImages) return { totalSections: 0, totalImages: 0, validImages: 0 };
      
      const imageData = JSON.parse(savedImages);
      let totalImages = 0;
      let validImages = 0;
      const totalSections = Object.keys(imageData).length;
      
      Object.values(imageData).forEach((images: any) => {
        if (Array.isArray(images)) {
          totalImages += images.length;
          validImages += images.filter((img: any) => 
            img && typeof img === 'object' && this.isValidImageUrl(img.src)
          ).length;
        }
      });
      
      return { totalSections, totalImages, validImages };
      
    } catch (error) {
      console.error('Failed to get image stats:', error);
      return { totalSections: 0, totalImages: 0, validImages: 0 };
    }
  }
}

export const imageCleanupService = ImageCleanupService.getInstance();
