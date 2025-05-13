import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
interface ImageSectionProps {
  imagePath: string;
  altText: string;
  caption?: string;
}
const ImageSection: React.FC<ImageSectionProps> = ({
  imagePath,
  altText,
  caption
}) => {
  return <div className="my-6">
      <div className="overflow-hidden rounded-md border border-neutral-200">
        <AspectRatio ratio={16 / 9} className="bg-neutral-100">
          <img src={imagePath} alt={altText} className="object-cover w-full h-full" />
        </AspectRatio>
      </div>
      {caption && <p className="mt-2 text-sm text-center text-neutral-dark italic">
          {caption}
        </p>}
    </div>;
};
export default ImageSection;