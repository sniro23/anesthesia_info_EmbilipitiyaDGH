
// File Upload API - uses Lovable's native upload system
export const uploadFile = async (file: File): Promise<{ success: boolean; data?: { url: string; id: string }; error?: string }> => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    
    // Check file size (max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      throw new Error('File size exceeds 5MB limit');
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('File type not supported. Please upload a JPG, PNG, or GIF image.');
    }
    
    console.log('Starting Lovable native upload for file:', file.name);
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const extension = file.name.split('.').pop() || 'png';
    const filename = `${timestamp}-${randomId}.${extension}`;
    
    // Use Lovable's upload system - this will be intercepted by the fetch interceptor
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const data = await response.json();
    
    console.log('Lovable upload successful:', data);
    
    return {
      success: true,
      data: {
        url: data.url,
        id: data.id || `img-${timestamp}-${randomId}`
      }
    };
  } catch (error) {
    console.error('Upload API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
