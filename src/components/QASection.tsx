
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface QASectionProps {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const QASection: React.FC<QASectionProps> = ({ 
  question, 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-2xl overflow-hidden mb-4">
      <button
        className="w-full flex justify-between items-center p-4 md:p-6 text-left bg-neutral-light hover:bg-neutral-mid/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg md:text-xl font-medium">{question}</h3>
        <ChevronDown 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </button>
      
      {isOpen && (
        <div className="p-4 md:p-6 bg-white prose max-w-none">
          {children}
        </div>
      )}
    </div>
  );
};

export default QASection;
