
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

  if (!images || images.length === 0) return null;

  // Process image paths to make sure they work correctly
  const processedImages = images.map(image => ({
    ...image,
    src: image.src.startsWith('blob:') 
      ? image.src 
      : image.src.startsWith('public/') 
        ? image.src.replace('public/', '/') 
        : image.src
  }));

  console.log("Rendering images:", processedImages.map(img => img.src));

  // For a single image display
  if (layout === 'single' || images.length === 1) {
    return (
      <div className={cn("w-full mt-4", className)}>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <AspectRatio ratio={16/9} className="bg-neutral-100">
            <img 
              src={processedImages[0].src} 
              alt={processedImages[0].alt || "Image"} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                console.error("Image failed to load:", processedImages[0].src);
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </AspectRatio>
          {processedImages[0].caption && (
            <div className="p-2 text-sm text-center text-neutral-600 bg-neutral-50">
              {processedImages[0].caption}
            </div>
          )}
        </div>
      </div>
    );
  }

  // For a carousel layout
  if (layout === 'carousel') {
    return (
      <div className={cn("w-full mt-4", className)}>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <AspectRatio ratio={16/9} className="bg-neutral-100">
            <img 
              src={processedImages[activeIndex].src} 
              alt={processedImages[activeIndex].alt || "Image"} 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Image failed to load:", processedImages[activeIndex].src);
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            
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
          {processedImages[activeIndex].caption && (
            <div className="p-2 text-sm text-center text-neutral-600 bg-neutral-50">
              {processedImages[activeIndex].caption}
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
      {processedImages.map((image, index) => (
        <div key={index} className="rounded-lg overflow-hidden shadow-md">
          <AspectRatio ratio={1} className="bg-neutral-100">
            <img 
              src={image.src} 
              alt={image.alt || "Image"} 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Image failed to load:", image.src);
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
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
