
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

// Load images: try localStorage first, then merge with published data
const loadInitialImages = (): Record<string, ImageData[]> => {
  console.log('Loading initial images...');
  console.log('Published images available:', PUBLISHED_IMAGES);
  
  // Start with published images as base
  let mergedImages = { ...PUBLISHED_IMAGES };
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('Found localStorage images:', parsed);
      
      // Merge localStorage images with published images
      // localStorage takes precedence for sections that exist in both
      Object.keys(parsed).forEach(sectionId => {
        if (parsed[sectionId] && parsed[sectionId].length > 0) {
          mergedImages[sectionId] = parsed[sectionId];
        }
      });
    } else {
      console.log('No localStorage data found, using published images only');
    }
  } catch (error) {
    console.warn('Failed to load saved images from localStorage:', error);
    console.log('Falling back to published images only');
  }
  
  console.log('Final merged images:', mergedImages);
  return mergedImages;
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

  // Save to localStorage whenever images change (only in admin/development)
  useEffect(() => {
    // Only save to localStorage if we have admin functionality available
    if (typeof localStorage !== 'undefined') {
      saveImages(images);
    }
  }, [images]);

  const getImagesForSection = (sectionId: string) => {
    const sectionImages = images[sectionId] || [];
    console.log(`Getting images for section ${sectionId}:`, sectionImages);
    return sectionImages;
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
    // Reset to published images only
    setImages({ ...PUBLISHED_IMAGES });
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    console.log('All localStorage images cleared - reset to published images');
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
