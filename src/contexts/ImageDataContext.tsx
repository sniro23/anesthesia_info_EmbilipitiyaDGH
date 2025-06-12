
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ImageData } from '@/components/ImageGallery';

const initialImages: Record<string, ImageData[]> = {};

interface ImageContextProps {
  images: Record<string, ImageData[]>;
  getImagesForSection: (sectionId: string) => ImageData[];
  updateImagesForSection: (sectionId: string, images: ImageData[]) => void;
  addImage: (sectionId: string, image: ImageData) => void;
  removeImage: (sectionId: string, index: number) => void;
  updateImage: (sectionId: string, index: number, image: ImageData) => void;
  clearAllImages: () => void;
}

const IMAGE_STORAGE_KEY = 'anesthesia-site-images';

const ImageDataContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<Record<string, ImageData[]>>(initialImages);
  
  // Load existing images from localStorage on mount (don't clear them!)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedImages = localStorage.getItem(IMAGE_STORAGE_KEY);
      if (savedImages) {
        const parsedImages = JSON.parse(savedImages);
        console.log('Loading saved images from localStorage:', parsedImages);
        setImages(parsedImages);
      }
    } catch (error) {
      console.error('Failed to load saved images:', error);
    }
  }, []);
  
  // Save images to localStorage whenever they change
  useEffect(() => {
    try {
      // Filter out any images with empty src before saving
      const cleanImages: Record<string, ImageData[]> = {};
      Object.entries(images).forEach(([sectionId, sectionImages]) => {
        const validImages = sectionImages.filter(img => img.src && img.src.trim() !== '');
        if (validImages.length > 0) {
          cleanImages[sectionId] = validImages;
        }
      });
      
      localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(cleanImages));
      console.log("Images saved to localStorage:", cleanImages);
    } catch (error) {
      console.error("Failed to save images:", error);
    }
  }, [images]);

  const getImagesForSection = (sectionId: string) => {
    return images[sectionId] || [];
  };

  const updateImagesForSection = (sectionId: string, newImages: ImageData[]) => {
    // Filter out any images with empty src
    const validImages = newImages.filter(img => img.src && img.src.trim() !== '');
    
    setImages(prev => ({
      ...prev,
      [sectionId]: validImages
    }));
  };

  const addImage = (sectionId: string, image: ImageData) => {
    // Don't add images with empty src
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
    // Don't update to an image with empty src
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
    localStorage.removeItem(IMAGE_STORAGE_KEY);
    // Clean up any old uploaded file data
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('uploaded-file-')) {
        localStorage.removeItem(key);
      }
    });
    console.log('All images cleared');
  };

  return (
    <ImageDataContext.Provider value={{ 
      images, 
      getImagesForSection, 
      updateImagesForSection,
      addImage,
      removeImage,
      updateImage,
      clearAllImages
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
