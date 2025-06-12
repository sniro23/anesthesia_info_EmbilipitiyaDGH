
// Create a global fetch interceptor for Lovable's native image handling
const originalFetch = window.fetch;

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
      
      // Generate unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 9);
      const extension = file.name.split('.').pop() || 'png';
      const filename = `${timestamp}-${randomId}.${extension}`;
      const uploadPath = `/lovable-uploads/${filename}`;
      
      // Convert file to data URL for storage
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: file.type });
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(blob);
      });
      
      // Store in localStorage for retrieval
      const fileStorage = JSON.parse(localStorage.getItem('lovable-files') || '{}');
      fileStorage[uploadPath] = {
        dataUrl: dataUrl,
        filename: filename,
        originalName: file.name,
        contentType: file.type,
        uploadDate: new Date().toISOString()
      };
      localStorage.setItem('lovable-files', JSON.stringify(fileStorage));
      
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
