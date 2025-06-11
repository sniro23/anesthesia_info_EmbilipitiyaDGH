
// Create a global fetch interceptor for Lovable's native image handling
const originalFetch = window.fetch;

window.fetch = async function(input, init) {
  // Check if this is a call to our upload API
  if (input === '/api/upload' && init?.method === 'POST') {
    console.log('Intercepting upload request for Lovable native storage');
    
    // Handle file upload using Lovable's system
    const formData = init.body as FormData;
    const file = formData.get('file') as File;
    const filename = formData.get('filename') as string;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      // Create a data URL for the image
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: file.type });
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      
      // Store in Lovable's upload format
      const uploadPath = `/lovable-uploads/${filename}`;
      
      // Store the file data for retrieval
      const fileStorage = JSON.parse(localStorage.getItem('lovable-files') || '{}');
      fileStorage[uploadPath] = {
        dataUrl: dataUrl,
        filename: filename,
        originalName: file.name,
        contentType: file.type,
        uploadDate: new Date().toISOString()
      };
      localStorage.setItem('lovable-files', JSON.stringify(fileStorage));
      
      console.log(`File saved to Lovable storage: ${uploadPath}`);
      
      return new Response(JSON.stringify({
        url: uploadPath,
        id: filename.split('.')[0]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('Lovable upload error:', error);
      return new Response(JSON.stringify({ error: 'Upload failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  // For all other requests, use the original fetch
  return originalFetch.apply(window, [input, init]);
};

console.log('Fetch interceptor initialized for Lovable native file storage');
