
import React from 'react';
import ImageAdmin from '@/components/admin/ImageAdmin';

const AdminPage: React.FC = () => {
  // These are example section IDs that would match your content structure
  const sectionIds = [
    'during.qa1', 'during.qa2', 'during.qa3', 'during.qa4', 'during.qa5',
    'before.qa1', 'before.qa2', 'before.qa3', 'before.qa4',
    'after.qa1', 'after.qa2', 'after.qa3', 'after.qa4'
  ];
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        Admin Dashboard
      </h1>
      
      <div className="mb-8">
        <ImageAdmin sections={sectionIds} />
      </div>
    </div>
  );
};

export default AdminPage;
