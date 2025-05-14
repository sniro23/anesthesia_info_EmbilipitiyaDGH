
import React, { useState } from 'react';
import ImageAdmin from '@/components/admin/ImageAdmin';

const AdminPage: React.FC = () => {
  // These are example section IDs that would match your content structure
  const allSectionIds = [
    'during.qa1', 'during.qa2', 'during.qa3', 'during.qa4', 'during.qa5',
    'before.qa1', 'before.qa2', 'before.qa3', 'before.qa4',
    'after.qa1', 'after.qa2', 'after.qa3', 'after.qa4'
  ];
  
  // Group sections by category for better organization
  const sectionGroups = {
    'before': allSectionIds.filter(id => id.startsWith('before.')),
    'during': allSectionIds.filter(id => id.startsWith('during.')),
    'after': allSectionIds.filter(id => id.startsWith('after.')),
  };
  
  const [activeGroup, setActiveGroup] = useState<'all' | 'before' | 'during' | 'after'>('all');
  
  // Filter sections based on the active group
  const filteredSectionIds = activeGroup === 'all' 
    ? allSectionIds 
    : sectionGroups[activeGroup as keyof typeof sectionGroups];
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        Admin Dashboard
      </h1>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setActiveGroup('all')}
            className={`px-4 py-2 text-sm font-medium border ${activeGroup === 'all' ? 'bg-indigo text-white' : 'bg-white text-gray-700'} rounded-l-md`}
          >
            All Sections
          </button>
          <button
            type="button"
            onClick={() => setActiveGroup('before')}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${activeGroup === 'before' ? 'bg-indigo text-white' : 'bg-white text-gray-700'}`}
          >
            Before Surgery
          </button>
          <button
            type="button"
            onClick={() => setActiveGroup('during')}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${activeGroup === 'during' ? 'bg-indigo text-white' : 'bg-white text-gray-700'}`}
          >
            During Surgery
          </button>
          <button
            type="button"
            onClick={() => setActiveGroup('after')}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${activeGroup === 'after' ? 'bg-indigo text-white' : 'bg-white text-gray-700'} rounded-r-md`}
          >
            After Surgery
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <ImageAdmin sections={filteredSectionIds} />
      </div>
    </div>
  );
};

export default AdminPage;
