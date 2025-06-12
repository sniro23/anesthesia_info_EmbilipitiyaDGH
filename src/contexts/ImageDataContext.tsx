
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ImageData } from '@/components/ImageGallery';

const STORAGE_KEY = 'lovable-image-data';

// This will be populated with exported data for published versions
const PUBLISHED_IMAGES: Record<string, ImageData[]> = {
  "before.qa1": [
    {
      "src": "https://res.cloudinary.com/dotj571pv/image/upload/v1749714168/Pre-Op_Assesment_c13djk.png",
      "alt": "patient being assessed prior to surgery",
      "caption": "patient being assessed prior to surgery"
    }
  ],
  "during.qa1": [
    {
      "src": "https://res.cloudinary.com/dotj571pv/image/upload/v1749714142/During_qa1_k1qbql.jpg",
      "alt": "",
      "caption": "patient being monitored during surgery"
    }
  ],
  "after.qa1": [
    {
      "src": "https://res.cloudinary.com/dotj571pv/image/upload/v1749715940/WaitingRoom_sgaoou.jpg",
      "alt": "",
      "caption": "modern well equipped recovery room"
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
  clearAllImages: () => void;
  exportImages: () => string;
}

const ImageDataContext = createContext<ImageContextProps | undefined>(undefined);

// Load images: first try localStorage, then fall back to published data
const loadInitialImages = (): Record<string, ImageData[]> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('Loaded saved images from localStorage:', parsed);
      return parsed;
    }
  } catch (error) {
    console.warn('Failed to load saved images:', error);
  }
  
  // If no localStorage data, use published images (for production)
  if (Object.keys(PUBLISHED_IMAGES).length > 0) {
    console.log('Using published images:', PUBLISHED_IMAGES);
    return PUBLISHED_IMAGES;
  }
  
  console.log('Starting with empty image data - admin can add images');
  return {};
};

// Save all images to localStorage
const saveImages = (images: Record<string, ImageData[]>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    console.log('Saved images to localStorage:', images);
  } catch (error) {
    console.warn('Failed to save images:', error);
  }
};

export const ImageDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<Record<string, ImageData[]>>(loadInitialImages);

  // Save to localStorage whenever images change
  useEffect(() => {
    saveImages(images);
  }, [images]);

  const getImagesForSection = (sectionId: string) => {
    return images[sectionId] || [];
  };

  const updateImagesForSection = (sectionId: string, newImages: ImageData[]) => {
    const validImages = newImages.filter(img => img.src && img.src.trim() !== '');
    
    setImages(prev => ({
      ...prev,
      [sectionId]: validImages
    }));
  };

  const addImage = (sectionId: string, image: ImageData) => {
    if (!image.src || image.src.trim() === '') {
      console.warn('Attempted to add image with empty src');
      return;
    }
    
    setImages(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), image]
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
    if (!image.src || image.src.trim() === '') {
      console.warn('Attempted to update to image with empty src');
      return;
    }
    
    setImages(prev => {
      if (!prev[sectionId]) return prev;
      
      const newImages = [...prev[sectionId]];
      newImages[index] = image;
      
      return {
        ...prev,
        [sectionId]: newImages
      };
    });
  };

  const clearAllImages = () => {
    setImages({});
    localStorage.removeItem(STORAGE_KEY);
    console.log('All images cleared - starting fresh');
  };

  const exportImages = () => {
    return JSON.stringify(images, null, 2);
  };

  return (
    <ImageDataContext.Provider value={{ 
      images, 
      getImagesForSection, 
      updateImagesForSection,
      addImage,
      removeImage,
      updateImage,
      clearAllImages,
      exportImages
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
