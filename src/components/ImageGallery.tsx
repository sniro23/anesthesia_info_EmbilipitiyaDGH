
import React, { useState, useEffect } from 'react';
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
  const [processedImages, setProcessedImages] = useState<ImageData[]>([]);

  // Process image paths to use stored data URLs when available
  useEffect(() => {
    const processImages = () => {
      // Filter out images with empty or invalid src first
      const validImages = images.filter(image => {
        if (!image.src || image.src.trim() === '') {
          console.warn('Filtering out image with empty src:', image);
          return false;
        }
        return true;
      });

      const processed = validImages.map((image) => {
        let src = image.src;
        
        // If this is a Lovable uploads path, check localStorage for stored data URL
        if (src.startsWith('/lovable-uploads/')) {
          try {
            const fileStorage = JSON.parse(localStorage.getItem('lovable-files') || '{}');
            const storedFile = fileStorage[src];
            if (storedFile && storedFile.dataUrl) {
              console.log(`Using stored data URL for: ${src}`);
              src = storedFile.dataUrl;
            } else {
              console.log(`No stored data found for: ${src}`);
            }
          } catch (error) {
            console.error('Error accessing stored files:', error);
          }
        }
        
        return { ...image, src };
      });
      
      setProcessedImages(processed);
      console.log(`ImageGallery processed ${processed.length} images`);
    };

    processImages();
  }, [images]);

  const handleImageError = (imageSrc: string) => {
    console.error("Image failed to load:", imageSrc);
    setImageErrors(prev => new Set([...prev, imageSrc]));
  };

  const renderImage = (image: ImageData, index: number) => (
    <img 
      key={`${image.src}-${index}`}
      src={image.src} 
      alt={image.alt || "Image"} 
      className="w-full h-full object-cover" 
      onError={() => handleImageError(image.src)}
      loading="lazy"
    />
  );

  // Don't render anything if no valid images
  if (!processedImages || processedImages.length === 0) {
    return null;
  }

  // For a single image display
  if (layout === 'single' || processedImages.length === 1) {
    const image = processedImages[0];
    
    return (
      <div className={cn("w-full mt-4", className)}>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <AspectRatio ratio={16/9} className="bg-neutral-100">
            {imageErrors.has(image.src) ? (
              <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                Failed to load image
              </div>
            ) : (
              renderImage(image, 0)
            )}
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
    const activeImage = processedImages[activeIndex];
    
    return (
      <div className={cn("w-full mt-4", className)}>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <AspectRatio ratio={16/9} className="bg-neutral-100">
            {imageErrors.has(activeImage.src) ? (
              <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                Failed to load image
              </div>
            ) : (
              renderImage(activeImage, activeIndex)
            )}
            
            {/* Navigation buttons */}
            {processedImages.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveIndex((prev) => (prev === 0 ? processedImages.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setActiveIndex((prev) => (prev === processedImages.length - 1 ? 0 : prev + 1))}
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
          {processedImages.length > 1 && (
            <div className="flex justify-center p-2 gap-1">
              {processedImages.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-indigo-600' : 'bg-neutral-300'}`}
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
      processedImages.length === 2 ? "grid-cols-2" : 
      processedImages.length >= 3 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "",
      className
    )}>
      {processedImages.map((image, index) => (
        <div key={`${image.src}-${index}`} className="rounded-lg overflow-hidden shadow-md">
          <AspectRatio ratio={1} className="bg-neutral-100">
            {imageErrors.has(image.src) ? (
              <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
                Failed to load image
              </div>
            ) : (
              renderImage(image, index)
            )}
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
