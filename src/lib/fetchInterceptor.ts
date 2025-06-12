// Create a global fetch interceptor for Lovable's native image handling
const originalFetch = window.fetch;

// Helper function to compress image before storing
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions (max 800px width)
      const maxWidth = 800;
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      resolve(compressedDataUrl);
    };
    
    img.onerror = () => reject(new Error('Failed to load image for compression'));
    img.src = URL.createObjectURL(file);
  });
};

// Helper function to clean up old files if storage is getting full
const cleanupOldFiles = () => {
  try {
    const fileStorage = JSON.parse(localStorage.getItem('lovable-files') || '{}');
    const files = Object.entries(fileStorage);
    
    // If we have more than 10 files, remove the oldest ones
    if (files.length > 10) {
      const sortedFiles = files.sort((a, b) => {
        const aDate = new Date((a[1] as any).uploadDate || 0).getTime();
        const bDate = new Date((b[1] as any).uploadDate || 0).getTime();
        return aDate - bDate;
      });
      
      // Keep only the 8 most recent files
      const filesToKeep = sortedFiles.slice(-8);
      const newStorage: Record<string, any> = {};
      
      filesToKeep.forEach(([path, data]) => {
        newStorage[path] = data;
      });
      
      localStorage.setItem('lovable-files', JSON.stringify(newStorage));
      console.log(`Cleaned up old files, keeping ${filesToKeep.length} most recent`);
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};

window.fetch = async function(input, init) {
  // Check if this is a call to our upload API
  if (input === '/api/upload' && init?.method === 'POST') {
    console.log('Intercepting upload request for Lovable native storage');
    
    try {
      const formData = init.body as FormData;
      if (!formData) {
        throw new Error('No form data provided');
      }

      const file = formData.get('file') as File;
      if (!file) {
        throw new Error('No file provided');
      }
      
      console.log('Processing file upload:', file.name, file.type, file.size);
      
      // Clean up old files first
      cleanupOldFiles();
      
      // Generate unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 9);
      const extension = file.name.split('.').pop() || 'png';
      const filename = `${timestamp}-${randomId}.${extension}`;
      const uploadPath = `/lovable-uploads/${filename}`;
      
      // Compress the image to reduce storage size
      const compressedDataUrl = await compressImage(file);
      
      // Store in localStorage
      const fileStorage = JSON.parse(localStorage.getItem('lovable-files') || '{}');
      fileStorage[uploadPath] = {
        dataUrl: compressedDataUrl,
        filename: filename,
        originalName: file.name,
        contentType: file.type,
        uploadDate: new Date().toISOString()
      };
      
      try {
        localStorage.setItem('lovable-files', JSON.stringify(fileStorage));
      } catch (storageError) {
        // If storage still fails, try one more cleanup and retry
        console.warn('Storage full, attempting additional cleanup');
        localStorage.removeItem('lovable-files');
        const minimalStorage: Record<string, any> = {};
        minimalStorage[uploadPath] = fileStorage[uploadPath];
        localStorage.setItem('lovable-files', JSON.stringify(minimalStorage));
      }
      
      console.log(`File uploaded and stored: ${uploadPath}`);
      
      return new Response(JSON.stringify({
        url: uploadPath,
        id: filename.split('.')[0]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      return new Response(JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Upload failed' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  // For all other requests, use the original fetch
  return originalFetch.apply(window, [input, init]);
};

console.log('Fetch interceptor initialized for Lovable native file storage');
