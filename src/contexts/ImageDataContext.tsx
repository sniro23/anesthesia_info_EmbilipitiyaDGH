import React, { createContext, useContext, useState, useEffect } from 'react';
import { ImageData } from '@/components/ImageGallery';
import { imageStorageService } from '@/lib/imageStorage';

// Initial data with images from public/imageuplodas/ directory
const initialImages: Record<string, ImageData[]> = {
  'before.qa1': [
    { 
      src: "/imageuplodas/608af697-e9b5-487a-befd-b3732af98807.png", 
      alt: "Doctor and patient consultation in medical office",
      caption: "Pre-anesthesia consultation and assessment"
    }
  ],
  'during.qa1': [
    { 
      src: "/imageuplodas/0ea6d54e-390a-4ee9-ba5c-109568840422.png", 
      alt: "Patient during surgery with monitoring equipment",
      caption: "Anesthesia monitoring during surgery"
    },
    { 
      src: "/imageuplodas/130acc06-67a9-466f-a6ad-f05f720e7df9.png", 
      alt: "Surgical team performing operation in operating room",
      caption: "Medical team during surgery with modern equipment"
    }
  ],
  'during.qa2': [
    { 
      src: "/imageuplodas/f49d3076-062b-4065-847a-37b4fc4916a3.png", 
      alt: "Different types of anesthesia administration",
      caption: "Regional anesthesia being administered"
    }
  ],
  'during.qa3': [
    { 
      src: "/imageuplodas/5e8755f9-3478-4ccc-b5fc-50041e16be04.png", 
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
    
    console.log('Using initial images from imageuplodas directory:', initialImages);
    return initialImages;
  };

  const [images, setImages] = useState<Record<string, ImageData[]>>(loadSavedImages);
  
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

  // Process image paths to use imageuplodas directory
  const processImagePath = (image: ImageData): ImageData => {
    if (!image.src) return image;
    
    let src = image.src;
    
    // Convert old lovable-uploads paths to imageuplodas paths
    if (src.startsWith('/lovable-uploads/')) {
      const filename = src.split('/').pop();
      src = `/imageuplodas/${filename}`;
      console.log(`Converted path from lovable-uploads to imageuplodas: ${src}`);
    }
    
    // Ensure paths start with /imageuplodas/ for new uploads
    if (src.startsWith('/imageuplodas/')) {
      src = imageStorageService.getDisplayUrl(src);
    }
    
    return { ...image, src };
  };

  const getImagesForSection = (sectionId: string) => {
    const sectionImages = images[sectionId] || [];
    return sectionImages.map(processImagePath);
  };

  const updateImagesForSection = (sectionId: string, newImages: ImageData[]) => {
    setImages(prev => ({
      ...prev,
      [sectionId]: newImages.map(processImagePath)
    }));
  };

  const addImage = (sectionId: string, image: ImageData) => {
    setImages(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), processImagePath(image)]
    }));
  };

  const removeImage = (sectionId: string, index: number) => {
    setImages(prev => {
      if (!prev[sectionId]) return prev;
      
      const newImages = [...prev[sectionId]];
      newImages.splice(index, 1);
      
      return {
        ...prev,
        [sectionId]: newImages
      };
    });
  };

  const updateImage = (sectionId: string, index: number, image: ImageData) => {
    setImages(prev => {
      if (!prev[sectionId]) return prev;
      
      const newImages = [...prev[sectionId]];
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
