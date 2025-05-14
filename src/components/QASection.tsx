
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ImageGallery, { ImageData } from './ImageGallery';

interface QASectionProps {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  image?: string;
  imageAlt?: string;
  images?: ImageData[];
  imageLayout?: 'single' | 'grid' | 'carousel';
}

const QASection: React.FC<QASectionProps> = ({ 
  question, 
  children, 
  defaultOpen = false,
  image,
  imageAlt = "Illustrative image",
  images = [],
  imageLayout = 'single'
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Convert legacy single image prop to images array format
  const imageArray: ImageData[] = image 
    ? [{ src: image, alt: imageAlt }].concat(images) 
    : images;

  return (
    <div className="border rounded-lg md:rounded-2xl overflow-hidden mb-3 md:mb-4">
      <button
        className="w-full flex justify-between items-center p-3 sm:p-4 md:p-6 text-left bg-neutral-light hover:bg-neutral-mid/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base sm:text-lg md:text-xl font-medium pr-2">{question}</h3>
        <ChevronDown 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''} flex-shrink-0`} 
          size={18} 
        />
      </button>
      
      {isOpen && (
        <div className="p-3 sm:p-4 md:p-6 bg-white prose max-w-none text-sm sm:text-base">
          {children}
          
          {imageArray.length > 0 && (
            <ImageGallery 
              images={imageArray} 
              layout={imageLayout} 
              className="mt-4"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QASection;
