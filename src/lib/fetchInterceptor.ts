
import { uploadFile } from './api';

// Create a global fetch interceptor for image handling
const originalFetch = window.fetch;

window.fetch = async function(input, init) {
  // Check if this is a call to our upload API
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
    
    // Process the upload using our service
    const response = await uploadFile(file);
    
    console.log('Upload response:', response);
    
    // Create a Response object with the correct data structure
    if (response.success && response.data) {
      return new Response(JSON.stringify(response.data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(JSON.stringify({ error: response.error }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
  
  // For all other requests, use the original fetch
  return originalFetch.apply(window, [input, init]);
};

console.log('Fetch interceptor initialized for client-side image handling');
