
// Simple upload handler for GitHub integration
// This file handles the /api/upload endpoint

async function handleUpload(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const extension = file.name.split('.').pop() || 'png';
    const filename = `${timestamp}-${randomId}.${extension}`;
    
    // In a real implementation, this would save to GitHub
    // For now, return the expected response format
    return new Response(JSON.stringify({
      success: true,
      url: `/imageuplodas/${filename}`,
      id: `img-${timestamp}-${randomId}`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Upload failed',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { handleUpload };
}
