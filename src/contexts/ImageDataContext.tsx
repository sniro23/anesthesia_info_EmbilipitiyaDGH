
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ImageData } from '@/components/ImageGallery';

// Hard-coded image data that persists between sessions
const STATIC_IMAGES: Record<string, ImageData[]> = {
  'before.qa1': [
    {
      src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Medical consultation',
      caption: 'Pre-anesthesia assessment'
    }
  ],
  'before.qa2': [
    {
      src: 'https://images.unsplash.com/photo-1584362917165-526f4bb96fa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fasting guidelines',
      caption: 'Fasting before surgery'
    }
  ],
  'before.qa4': [
    {
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Surgery preparation',
      caption: 'Preparing for surgery'
    }
  ],
  'during.qa1': [
    {
      src: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Operating room',
      caption: 'Modern operating room'
    }
  ],
  'during.qa3': [
    {
      src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Anesthesia monitoring',
      caption: 'Patient monitoring during anesthesia'
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
}

const ImageDataContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<Record<string, ImageData[]>>(STATIC_IMAGES);

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
    setImages(STATIC_IMAGES);
    console.log('Images reset to static defaults');
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
