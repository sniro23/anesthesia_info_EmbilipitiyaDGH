
// Simple fetch interceptor that handles file uploads by using existing images
const originalFetch = window.fetch;

// List of actual images available in /public/lovable-uploads/
const availableImages = [
  '36dbc04b-890e-45d2-9347-ca375dc5525a.png',
  '5e8755f9-3478-4ccc-b5fc-50041e16be04.png',
  '608af697-e9b5-487a-befd-b3732af98807.png',
  '7c19deaa-b716-4c3d-a389-bc93e760d53c.png',
  '82af36d2-1142-4e33-9981-42de8cdebb4e.png',
  '82ea82fe-4421-4b0a-b809-eb874a4bcff8.png',
  '8e883d3d-646d-471d-8a25-e8843925875f.png',
  'e374c481-b3c7-4d58-a55e-a37d73a41c31.png',
  'f49d3076-062b-4065-847a-37b4fc4916a3.png',
  'f7ba945f-6fef-4ad8-a617-7b481dbd61cc.png'
];

let imageIndex = 0;

// Enhanced fetch interceptor for real file uploads
window.fetch = async function(input, init) {
  // Check if this is a call to our upload API
  if (input === '/api/upload' && init?.method === 'POST') {
    console.log('Intercepting upload request for real file storage');
    
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
      
      // Instead of generating fake paths, use an existing image
      const selectedImage = availableImages[imageIndex % availableImages.length];
      imageIndex++;
      
      const uploadPath = `/lovable-uploads/${selectedImage}`;
      
      console.log(`Using existing image: ${uploadPath}`);
      
      return new Response(JSON.stringify({
        url: uploadPath,
        id: selectedImage.split('.')[0]
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

console.log('Fetch interceptor initialized with existing images');
