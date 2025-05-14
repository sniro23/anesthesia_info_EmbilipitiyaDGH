
import React, { createContext, useContext, useState } from 'react';
import { ImageData } from '@/components/ImageGallery';

// Sample initial data
const initialImages: Record<string, ImageData[]> = {
  'during.qa1': [
    { 
      src: "public/lovable-uploads/0ea6d54e-390a-4ee9-ba5c-109568840422.png", 
      alt: "Patient during surgery with monitoring equipment",
      caption: "Anesthesia monitoring during surgery"
    }
  ],
  'during.qa2': [
    { 
      src: "public/lovable-uploads/f49d3076-062b-4065-847a-37b4fc4916a3.png", 
      alt: "Different types of anesthesia administration",
      caption: "Regional anesthesia being administered"
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

const ImageDataContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<Record<string, ImageData[]>>(initialImages);

  const getImagesForSection = (sectionId: string) => {
    return images[sectionId] || [];
  };

  const updateImagesForSection = (sectionId: string, newImages: ImageData[]) => {
    setImages(prev => ({
      ...prev,
      [sectionId]: newImages
    }));
  };

  const addImage = (sectionId: string, image: ImageData) => {
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
