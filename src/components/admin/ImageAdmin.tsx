import React, { useState, useCallback, useEffect } from 'react';
import { useImageData } from '@/contexts/ImageDataContext';
import { ImageData } from '@/components/ImageGallery';
import { Plus, X, Upload, Edit, Image, RefreshCcw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { mockUploadService } from '@/lib/mockFileUpload';

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
    
    console.log('File selected for upload:', file.name, file.size, file.type);
    
    // Create preview immediately
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
        console.log('Preview created for file');
      }
    };
    reader.readAsDataURL(file);
    
    setIsUploading(true);
    
    try {
      console.log('Starting file upload process...');
      
      // Use our existing upload service instead of the broken API call
      const result = await mockUploadService.uploadFile(file);
      
      console.log('Upload successful:', result);
      
      // Update the image with the new URL
      onChange({ ...image, src: result.url });
      toast.success('Image uploaded successfully');
      setPreviewUrl(null); // Clear preview since we have the real image now
      
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  }, [image, onChange]);

  const handleUrlChange = useCallback((url: string) => {
    console.log('Manual URL entered:', url);
    onChange({ ...image, src: url });
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
              onChange={(e) => handleUrlChange(e.target.value)}
              className="flex-1"
              placeholder="Enter image URL or upload a file"
            />
            <label className="cursor-pointer flex items-center justify-center px-4 py-2 border rounded bg-neutral-100 hover:bg-neutral-200">
              <Upload size={16} className="mr-2" />
              <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
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
            <div className="mt-2 text-sm text-blue-600">Uploading image, please wait...</div>
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
          <div className="relative">
            <img
              src={previewUrl || image.src}
              alt={image.alt || "Preview"}
              className="max-h-40 mx-auto object-contain"
              onLoad={() => console.log('Preview image loaded successfully:', previewUrl || image.src)}
              onError={(e) => {
                console.error('Preview image failed to load:', previewUrl || image.src);
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            {previewUrl && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white px-2 py-1 rounded text-xs">Preview</div>
              </div>
            )}
          </div>
          {previewUrl && (
            <div className="text-center text-sm text-neutral-500 mt-2">
              Preview - upload in progress
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
    console.log('Adding new image to section:', sectionId);
    setCurrentImage({ src: '', alt: '' });
    setEditingIndex(null);
    setIsDialogOpen(true);
  };

  const handleEditImage = (index: number) => {
    console.log('Editing image at index:', index, 'in section:', sectionId);
    setCurrentImage(images[index]);
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleSaveImage = () => {
    console.log('Saving image:', currentImage);
    
    if (!currentImage.src.trim()) {
      toast.error('Please provide an image URL or upload a file');
      return;
    }
    
    if (!currentImage.alt.trim()) {
      toast.error('Please provide alt text for accessibility');
      return;
    }
    
    if (editingIndex !== null) {
      updateImage(sectionId, editingIndex, currentImage);
      toast.success('Image updated successfully');
      console.log('Image updated at index:', editingIndex);
    } else {
      addImage(sectionId, currentImage);
      toast.success('Image added successfully');
      console.log('New image added to section:', sectionId);
    }
    setIsDialogOpen(false);
  };

  const handleRemoveImage = (index: number) => {
    console.log('Removing image at index:', index, 'from section:', sectionId);
    removeImage(sectionId, index);
    toast.success('Image removed');
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
                    onLoad={() => console.log('Admin thumbnail loaded:', image.src)}
                    onError={(e) => {
                      console.error("Admin image failed to load:", image.src);
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
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
                    onClick={() => handleRemoveImage(index)}
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
            <DialogDescription>
              {editingIndex !== null ? 'Update image details' : 'Add a new image to this section'}
            </DialogDescription>
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
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleRefresh = () => {
    console.log('Refreshing image admin data');
    setRefreshKey(prev => prev + 1);
    toast.success("Image data refreshed");
  };

  useEffect(() => {
    console.log('ImageAdmin mounted with sections:', sections);
  }, [sections]);

  return (
    <div className="p-6 max-w-4xl mx-auto" key={refreshKey}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Image Administration</h2>
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-1 px-3 py-2 bg-slate-200 text-slate-800 rounded hover:bg-slate-300"
        >
          <RefreshCcw size={14} />
          Refresh
        </button>
      </div>
      
      <div className="mb-6 p-4 bg-slate-100 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Upload Instructions</h3>
        <p className="text-sm text-neutral-700">
          Use the upload button to add images directly. You can also enter image URLs manually.
          For best results, use images that are at least 800x600 pixels. Supported formats: JPEG, PNG, GIF.
        </p>
      </div>
      
      <div className="space-y-8">
        {sections.map((sectionId) => (
          <SectionImages key={`${sectionId}-${refreshKey}`} sectionId={sectionId} />
        ))}
      </div>
    </div>
  );
};

export default ImageAdmin;
