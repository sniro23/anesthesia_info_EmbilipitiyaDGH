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
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  if (!images || images.length === 0) {
    console.log("ImageGallery: No images provided");
    return null;
  }

  console.log("ImageGallery rendering:", images.length, "images", images);

  const handleImageError = (imageSrc: string) => {
    console.error("Image failed to load:", imageSrc);
    setImageErrors(prev => new Set([...prev, imageSrc]));
  };

  const handleImageLoad = (imageSrc: string) => {
    console.log('Image loaded successfully:', imageSrc);
    setLoadedImages(prev => new Set([...prev, imageSrc]));
  };

  const isValidImageUrl = (src: string): boolean => {
    if (!src) return false;
    
    // Allow data URLs, blob URLs, and HTTP URLs
    if (src.startsWith('data:') || src.startsWith('blob:')) return true;
    if (src.startsWith('http://') || src.startsWith('https://')) return true;
    if (src === '/placeholder.svg') return true;
    
    // Legacy support for lovable-uploads paths (though they won't work when published)
    if (src.startsWith('/lovable-uploads/')) return true;
    
    console.warn('Invalid image URL format:', src);
    return false;
  };

  const renderImage = (image: ImageData, index: number) => {
    const hasError = imageErrors.has(image.src);
    const isLoaded = loadedImages.has(image.src);
    const isValidUrl = isValidImageUrl(image.src);
    
    // Show placeholder if image failed to load, has invalid src, or no src
    const shouldShowPlaceholder = hasError || !isValidUrl || !image.src;
    
    if (shouldShowPlaceholder) {
      return (
        <div 
          key={`placeholder-${index}`}
          className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400 text-sm"
        >
          {!image.src ? 'No image' : 'Image not available'}
        </div>
      );
    }

    return (
      <div key={`image-container-${index}`} className="relative w-full h-full">
        <img 
          src={image.src} 
          alt={image.alt || "Image"} 
          className="w-full h-full object-cover" 
          onError={() => handleImageError(image.src)}
          onLoad={() => handleImageLoad(image.src)}
          loading="lazy"
        />
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
            <div className="text-sm text-neutral-500">Loading...</div>
          </div>
        )}
      </div>
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
