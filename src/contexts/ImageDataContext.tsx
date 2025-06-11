
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ImageData } from '@/components/ImageGallery';
import { imageStorageService } from '@/lib/imageStorage';
import { imageCleanupService } from '@/lib/imageCleanup';

// Initial data with actual image paths from GitHub repo
const initialImages: Record<string, ImageData[]> = {
  'before.qa1': [
    { 
      src: "/lovable-uploads/608af697-e9b5-487a-befd-b3732af98807.png", 
      alt: "Doctor and patient consultation in medical office",
      caption: "Pre-anesthesia consultation and assessment"
    }
  ],
  'before.qa4': [
    { 
      src: "/lovable-uploads/36dbc04b-890e-45d2-9347-ca375dc5525a.png", 
      alt: "Different types of anesthesia administration",
      caption: "Regional anesthesia being administered"
    }
  ],
  'during.qa1': [
    { 
      src: "/lovable-uploads/0ea6d54e-390a-4ee9-ba5c-109568840422.png", 
      alt: "Patient during surgery with monitoring equipment",
      caption: "Anesthesia monitoring during surgery"
    }
  ],
  'during.qa2': [
    { 
      src: "/lovable-uploads/f49d3076-062b-4065-847a-37b4fc4916a3.png", 
      alt: "Different types of anesthesia administration",
      caption: "Regional anesthesia being administered"
    }
  ],
  'during.qa3': [
    { 
      src: "/lovable-uploads/5e8755f9-3478-4ccc-b5fc-50041e16be04.png", 
      alt: "Surgical team in operating room with patient monitoring",
      caption: "Patient being monitored while the surgeon performs the surgery"
    }
  ],
  'during.qa4': [
    { 
      src: "/lovable-uploads/1972c871-c38b-4929-9994-210f4458b895.png", 
      alt: "Surgical team performing operation in operating room",
      caption: "Medical team during surgery with modern equipment"
    }
  ],
  'after.qa1': [
    { 
      src: "/lovable-uploads/dbda5c25-5667-4d04-bff6-865cf577d567.png", 
      alt: "Patient in recovery room after surgery",
      caption: "Post-operative recovery and monitoring"
    }
  ],
  'after.qa2': [
    { 
      src: "/lovable-uploads/7c19deaa-b716-4c3d-a389-bc93e760d53c.png", 
      alt: "Patient care after surgery",
      caption: "Nursing care during recovery period"
    }
  ],
  'after.qa3': [
    { 
      src: "/lovable-uploads/82af36d2-1142-4e33-9981-42de8cdebb4e.png", 
      alt: "Patient discharge planning",
      caption: "Discharge instructions and follow-up care"
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
  // Test image availability on load
  const testImageAvailability = async (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        console.log(`✓ Image available: ${src}`);
        resolve(true);
      };
      img.onerror = () => {
        console.error(`✗ Image failed to load: ${src}`);
        resolve(false);
      };
      img.src = src;
    });
  };

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
  
  // Test image availability on startup
  useEffect(() => {
    const testAllImages = async () => {
      console.log('Testing image availability...');
      for (const [sectionId, sectionImages] of Object.entries(initialImages)) {
        for (const image of sectionImages) {
          await testImageAvailability(image.src);
        }
      }
      
      // Also test if the directory structure is correct
      fetch('/lovable-uploads/')
        .then(response => {
          if (response.ok) {
            console.log('✓ /lovable-uploads/ directory is accessible');
          } else {
            console.error('✗ /lovable-uploads/ directory is not accessible:', response.status);
          }
        })
        .catch(error => {
          console.error('✗ Error accessing /lovable-uploads/ directory:', error);
        });
    };
    
    testAllImages();
  }, []);
  
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

  // Validate and process image paths - allow valid URLs including lovable-uploads
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
    
    // lovable-uploads paths are valid - these exist in the GitHub repo
    if (src.startsWith('/lovable-uploads/')) {
      console.log(`Using lovable-uploads image: ${src}`);
      return { ...image, src };
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
