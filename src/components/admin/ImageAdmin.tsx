
import React, { useState, useCallback } from 'react';
import { useImageData } from '@/contexts/ImageDataContext';
import { ImageData } from '@/components/ImageGallery';
import { Plus, X, Upload, Edit, Image } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface ImageFormProps {
  image: ImageData;
  onChange: (image: ImageData) => void;
}

const ImageForm: React.FC<ImageFormProps> = ({ image, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Before upload, show a local preview
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
    
    // Start upload process
    setIsUploading(true);
    
    // We're using a simple FormData to upload the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      
      // Store the URL without the 'public/' prefix since it's served from the root
      const imagePath = data.url;
      onChange({ ...image, src: imagePath });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [image, onChange]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={image.src}
              onChange={(e) => onChange({ ...image, src: e.target.value })}
              className="flex-1"
              placeholder="Enter image URL or upload a file"
            />
            <label className="cursor-pointer flex items-center justify-center px-4 py-2 border rounded bg-neutral-100 hover:bg-neutral-200">
              <Upload size={16} className="mr-2" />
              <span>Upload</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          </div>
          {isUploading && (
            <div className="mt-2 text-sm text-neutral-500">Uploading image, please wait...</div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Alt Text</label>
          <Input
            type="text"
            value={image.alt}
            onChange={(e) => onChange({ ...image, alt: e.target.value })}
            placeholder="Describe the image for accessibility"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Caption (Optional)</label>
          <Input
            type="text"
            value={image.caption || ''}
            onChange={(e) => onChange({ ...image, caption: e.target.value })}
            placeholder="Add a caption to display below the image"
          />
        </div>
      </div>
      
      {(image.src || previewUrl) && (
        <div className="mt-2 p-2 border rounded">
          <img
            src={previewUrl || image.src}
            alt={image.alt || "Preview"}
            className="max-h-40 mx-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          {previewUrl && !image.src && (
            <div className="text-center text-sm text-neutral-500 mt-2">
              Preview (upload in progress)
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface SectionImagesProps {
  sectionId: string;
}

const SectionImages: React.FC<SectionImagesProps> = ({ sectionId }) => {
  const { getImagesForSection, addImage, removeImage, updateImage } = useImageData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState<ImageData>({ src: '', alt: '' });
  
  const images = getImagesForSection(sectionId);

  const handleAddImage = () => {
    setCurrentImage({ src: '', alt: '' });
    setEditingIndex(null);
    setIsDialogOpen(true);
  };

  const handleEditImage = (index: number) => {
    setCurrentImage(images[index]);
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleSaveImage = () => {
    if (editingIndex !== null) {
      updateImage(sectionId, editingIndex, currentImage);
    } else {
      addImage(sectionId, currentImage);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Images for Section: {sectionId}</h3>
        <button
          onClick={handleAddImage}
          className="flex items-center gap-1 px-3 py-1 bg-indigo text-white rounded hover:bg-indigo-light"
        >
          <Plus size={16} />
          Add Image
        </button>
      </div>

      {images.length === 0 ? (
        <p className="text-neutral-500 italic">No images for this section</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="border rounded-lg overflow-hidden bg-white">
              <div className="h-32 overflow-hidden bg-neutral-100">
                {image.src ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    <Image size={24} />
                    <span className="ml-2">No image</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{image.alt || "No alt text"}</p>
                {image.caption && (
                  <p className="text-xs text-neutral-500 truncate">{image.caption}</p>
                )}
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleEditImage(index)}
                    className="flex items-center gap-1 text-xs px-2 py-1 bg-neutral-100 hover:bg-neutral-200 rounded"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => removeImage(sectionId, index)}
                    className="flex items-center gap-1 text-xs px-2 py-1 bg-red-100 hover:bg-red-200 rounded text-red-600"
                  >
                    <X size={12} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? 'Edit Image' : 'Add New Image'}
            </DialogTitle>
          </DialogHeader>
          <ImageForm 
            image={currentImage}
            onChange={setCurrentImage}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 border rounded hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveImage}
              className="px-4 py-2 bg-indigo text-white rounded hover:bg-indigo-light"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ImageAdminProps {
  sections: string[];
}

const ImageAdmin: React.FC<ImageAdminProps> = ({ sections }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Image Administration</h2>
      
      <div className="mb-6 p-4 bg-slate-100 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Upload Instructions</h3>
        <p className="text-sm text-neutral-700">
          Use the upload button to add images directly. You can also enter image URLs manually.
          For best results, use images that are at least 800x600 pixels. Supported formats: JPEG, PNG, GIF.
        </p>
      </div>
      
      <div className="space-y-8">
        {sections.map((sectionId) => (
          <SectionImages key={sectionId} sectionId={sectionId} />
        ))}
      </div>
    </div>
  );
};

export default ImageAdmin;
