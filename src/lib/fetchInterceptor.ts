
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
    
    if (response.success && response.data) {
      // Store the uploaded file in localStorage to persist across refreshes
      try {
        const existingFiles = JSON.parse(localStorage.getItem('uploaded-files') || '{}');
        existingFiles[response.data.id] = response.data.url;
        localStorage.setItem('uploaded-files', JSON.stringify(existingFiles));
      } catch (error) {
        console.error('Failed to store uploaded file info:', error);
      }
    }
    
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

// Add a function to initialize blob URLs from localStorage on page load
const restoreUploadedFiles = () => {
  try {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploaded-files') || '{}');
    
    // Nothing to restore
    if (Object.keys(uploadedFiles).length === 0) return;
    
    console.log('Restoring uploaded files from localStorage:', Object.keys(uploadedFiles).length);
    
    // No need to do anything else as the URLs are already stored in the ImageDataContext
  } catch (error) {
    console.error('Failed to restore uploaded files:', error);
  }
};

// Run on import
restoreUploadedFiles();
