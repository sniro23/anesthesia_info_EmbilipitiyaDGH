
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface QASectionProps {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string; // Added ID to track QA sections
}

const QASection: React.FC<QASectionProps> = ({ 
  question, 
  children, 
  defaultOpen = false,
  id 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div 
      className="border rounded-lg md:rounded-2xl overflow-hidden mb-3 md:mb-4"
      data-qa-id={id}
    >
      <button
        className="w-full flex justify-between items-center p-3 sm:p-4 md:p-6 text-left bg-neutral-light hover:bg-neutral-mid/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-base sm:text-lg md:text-xl font-medium pr-2">{question}</h3>
        <ChevronDown 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''} flex-shrink-0`} 
          size={18} 
        />
      </button>
      
      {isOpen && (
        <div className="p-3 sm:p-4 md:p-6 bg-white prose max-w-none text-sm sm:text-base">
          {children}
        </div>
      )}
    </div>
  );
};

export default QASection;
