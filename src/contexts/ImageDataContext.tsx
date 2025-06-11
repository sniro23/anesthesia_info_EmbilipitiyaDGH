import React, { createContext, useContext, useState, useEffect } from 'react';
import { ImageData } from '@/components/ImageGallery';
import { imageStorageService } from '@/lib/imageStorage';
import { imageCleanupService } from '@/lib/imageCleanup';

// Sample initial data - using placeholder.svg for all images since /lovable-uploads/ paths don't work when published
const initialImages: Record<string, ImageData[]> = {
  'before.qa1': [
    { 
      src: "/placeholder.svg", 
      alt: "Doctor and patient consultation in medical office",
      caption: "Pre-anesthesia consultation and assessment"
    }
  ],
  'during.qa1': [
    { 
      src: "/placeholder.svg", 
      alt: "Patient during surgery with monitoring equipment",
      caption: "Anesthesia monitoring during surgery"
    },
    { 
      src: "/placeholder.svg", 
      alt: "Surgical team performing operation in operating room",
      caption: "Medical team during surgery with modern equipment"
    }
  ],
  'during.qa2': [
    { 
      src: "/placeholder.svg", 
      alt: "Different types of anesthesia administration",
      caption: "Regional anesthesia being administered"
    }
  ],
  'during.qa3': [
    { 
      src: "/placeholder.svg", 
      alt: "Surgical team in operating room with patient monitoring",
      caption: "Patient being monitored while the surgeon performs the surgery"
    }
  ]
};

interface ImageContextProps {
  images: Record<string, ImageData[]>;
  getImagesForSection: (sectionId: string) => ImageData[];
  updateImagesForSection: (sectionId: string, images: ImageData[]) => void;
  addImage: (sectionId: string, image: ImageData) => void;
  removeImage: (sectionId: string, index: number) => void;
  updateImage: (sectionId: string, index: number, image: ImageData) => void;
}

const IMAGE_STORAGE_KEY = 'anesthesia-site-images';

const ImageDataContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved images with fallback to initial data
  const loadSavedImages = (): Record<string, ImageData[]> => {
    if (typeof window === 'undefined') return initialImages;
    
    try {
      const savedImages = localStorage.getItem(IMAGE_STORAGE_KEY);
      if (savedImages) {
        const parsed = JSON.parse(savedImages);
        console.log('Loaded images from localStorage:', parsed);
        // Merge with initial images to ensure we don't lose default content
        return { ...initialImages, ...parsed };
      }
    } catch (error) {
      console.error("Failed to load saved images:", error);
    }
    
    console.log('Using initial images:', initialImages);
    return initialImages;
  };

  const [images, setImages] = useState<Record<string, ImageData[]>>(loadSavedImages);
  
  // Clean up invalid images on startup
  useEffect(() => {
    console.log('Running image cleanup on startup...');
    const stats = imageCleanupService.getImageStats();
    console.log('Image stats before cleanup:', stats);
    
    const cleanup = imageCleanupService.cleanupInvalidImages();
    if (cleanup.removed > 0) {
      console.log(`Cleaned up ${cleanup.removed} invalid images`);
      // Reload images after cleanup
      setImages(loadSavedImages());
    }
    
    imageStorageService.cleanupInvalidImages();
  }, []);
  
  // Save images to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
      console.log("Images saved to localStorage successfully");
    } catch (error) {
      console.error("Failed to save images:", error);
    }
  }, [images]);

  // Handle storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === IMAGE_STORAGE_KEY) {
        console.log("Storage changed from another tab, reloading images");
        setImages(loadSavedImages());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Validate and process image paths - only allow valid URLs for published apps
  const processImagePath = (image: ImageData): ImageData => {
    if (!image.src) {
      console.warn('Image has no src:', image);
      return { ...image, src: '/placeholder.svg' };
    }
    
    let src = image.src;
    
    // Data URLs are already ready to use
    if (src.startsWith('data:')) {
      return { ...image, src };
    }
    
    // Blob URLs are valid
    if (src.startsWith('blob:')) {
      return { ...image, src };
    }
    
    // External URLs are valid
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return { ...image, src };
    }
    
    // Placeholder is valid
    if (src === '/placeholder.svg') {
      return { ...image, src };
    }
    
    // Any /lovable-uploads/ paths are invalid when published - replace with placeholder
    if (src.startsWith('/lovable-uploads/') || src.includes('lovable-uploads')) {
      console.warn('Invalid lovable-uploads path detected, using placeholder:', src);
      return { ...image, src: '/placeholder.svg' };
    }
    
    // Any other path format is invalid - use placeholder
    console.warn('Invalid image path detected, using placeholder:', src);
    return { ...image, src: '/placeholder.svg' };
  };

  const getImagesForSection = (sectionId: string) => {
    const sectionImages = images[sectionId] || [];
    const processedImages = sectionImages.map(processImagePath);
    console.log(`Getting ${processedImages.length} images for section ${sectionId}:`, processedImages);
    return processedImages;
  };

  const updateImagesForSection = (sectionId: string, newImages: ImageData[]) => {
    console.log(`Updating images for section ${sectionId} with ${newImages.length} images`);
    setImages(prev => ({
      ...prev,
      [sectionId]: newImages.map(processImagePath)
    }));
  };

  const addImage = (sectionId: string, image: ImageData) => {
    const processedImage = processImagePath(image);
    console.log(`Adding image to section ${sectionId}:`, processedImage);
    setImages(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), processedImage]
    }));
  };

  const removeImage = (sectionId: string, index: number) => {
    console.log(`Removing image at index ${index} from section ${sectionId}`);
    setImages(prev => {
      if (!prev[sectionId]) return prev;
      
      const newImages = [...prev[sectionId]];
      const removedImage = newImages[index];
      
      // Clean up blob URL if it exists
      if (removedImage?.src.startsWith('blob:')) {
        URL.revokeObjectURL(removedImage.src);
        console.log('Revoked blob URL:', removedImage.src);
      }
      
      newImages.splice(index, 1);
      
      return {
        ...prev,
        [sectionId]: newImages
      };
    });
  };

  const updateImage = (sectionId: string, index: number, image: ImageData) => {
    console.log(`Updating image at index ${index} in section ${sectionId}:`, image);
    setImages(prev => {
      if (!prev[sectionId]) return prev;
      
      const newImages = [...prev[sectionId]];
      
      // Clean up old blob URL if it exists
      const oldImage = newImages[index];
      if (oldImage?.src.startsWith('blob:')) {
        URL.revokeObjectURL(oldImage.src);
        console.log('Revoked old blob URL:', oldImage.src);
      }
      
      newImages[index] = processImagePath(image);
      
      return {
        ...prev,
        [sectionId]: newImages
      };
    });
  };

  return (
    <ImageDataContext.Provider value={{ 
      images, 
      getImagesForSection, 
      updateImagesForSection,
      addImage,
      removeImage,
      updateImage
    }}>
      {children}
    </ImageDataContext.Provider>
  );
};

export const useImageData = () => {
  const context = useContext(ImageDataContext);
  if (context === undefined) {
    throw new Error('useImageData must be used within an ImageDataProvider');
  }
  return context;
};

export default ImageDataProvider;

}
