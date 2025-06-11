
import { uploadFile } from './api';

// Create a global fetch interceptor with improved image handling
const originalFetch = window.fetch;

window.fetch = async function(input, init) {
  // Check if this is a call to our mock upload API
  if (input === '/api/upload' && init?.method === 'POST') {
    console.log('Intercepting upload request');
    
    // Handle file upload
    const formData = init.body as FormData;
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Process the upload using our improved service
    const response = await uploadFile(file);
    
    console.log('Upload response:', response);
    
    // Create a mock Response object
    return new Response(JSON.stringify(response.data), {
      status: response.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  // For all other requests, use the original fetch
  return originalFetch.apply(window, [input, init]);
};

console.log('Fetch interceptor initialized with improved image handling');
