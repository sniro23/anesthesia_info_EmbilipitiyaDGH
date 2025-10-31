
/**
 * Legacy file upload service
 * This file is kept for backward compatibility but should not be used
 */

export const mockUploadService = {
  uploadFile: async (file: File): Promise<{ url: string; id: string }> => {
    throw new Error('mockUploadService is deprecated. Use the native /api/upload endpoint instead.');
  }
};

// Legacy export for backward compatibility
export { mockUploadService as default };
