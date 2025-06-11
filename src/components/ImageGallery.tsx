
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImageData {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: ImageData[];
  layout?: 'single' | 'grid' | 'carousel';
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  layout = 'single',
  className
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  if (!images || images.length === 0) return null;

  console.log("ImageGallery rendering:", images.length, "images", images);

  const handleImageError = (imageSrc: string) => {
    console.error("Image failed to load:", imageSrc);
    setImageErrors(prev => new Set([...prev, imageSrc]));
  };

  const renderImage = (image: ImageData, index: number) => {
    // Use placeholder if image failed to load or has invalid src
    const shouldShowPlaceholder = imageErrors.has(image.src) || !image.src;
    
    if (shouldShowPlaceholder) {
      return (
        <div 
          key={`placeholder-${index}`}
          className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400 text-sm"
        >
          Image not available
        </div>
      );
    }

    return (
      <img 
        key={`${image.src}-${index}`}
        src={image.src} 
        alt={image.alt || "Image"} 
        className="w-full h-full object-cover" 
        onError={() => handleImageError(image.src)}
        loading="lazy"
        onLoad={() => console.log('Image loaded successfully:', image.src)}
      />
    );
  };

  // For a single image display
  if (layout === 'single' || images.length === 1) {
    const image = images[0];
    return (
      <div className={cn("w-full mt-4", className)}>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <AspectRatio ratio={16/9} className="bg-neutral-100">
            {renderImage(image, 0)}
          </AspectRatio>
          {image.caption && (
            <div className="p-2 text-sm text-center text-neutral-600 bg-neutral-50">
              {image.caption}
            </div>
          )}
        </div>
      </div>
    );
  }

  // For a carousel layout
  if (layout === 'carousel') {
    const activeImage = images[activeIndex];
    return (
      <div className={cn("w-full mt-4", className)}>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <AspectRatio ratio={16/9} className="bg-neutral-100">
            {renderImage(activeImage, activeIndex)}
            
            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </AspectRatio>
          
          {/* Caption */}
          {activeImage.caption && (
            <div className="p-2 text-sm text-center text-neutral-600 bg-neutral-50">
              {activeImage.caption}
            </div>
            )}
          
          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="flex justify-center p-2 gap-1">
              {images.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-indigo' : 'bg-neutral-300'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // For a grid layout
  return (
    <div className={cn("w-full mt-4 grid gap-2", 
      images.length === 2 ? "grid-cols-2" : 
      images.length >= 3 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "",
      className
    )}>
      {images.map((image, index) => (
        <div key={`${image.src}-${index}`} className="rounded-lg overflow-hidden shadow-md">
          <AspectRatio ratio={1} className="bg-neutral-100">
            {renderImage(image, index)}
          </AspectRatio>
          {image.caption && (
            <div className="p-2 text-xs text-center text-neutral-600 bg-neutral-50 truncate">
              {image.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
