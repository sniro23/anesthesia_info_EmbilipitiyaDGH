
import { uploadFile } from './api';

// Create a global fetch interceptor
const originalFetch = window.fetch;

window.fetch = async function(input, init) {
  // Check if this is a call to our mock upload API
  if (input === '/api/upload' && init?.method === 'POST') {
    // Handle file upload
    const formData = init.body as FormData;
    const file = formData.get('file') as File;
    
    // Process the upload using our mock service
    const response = await uploadFile(file);
    
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
