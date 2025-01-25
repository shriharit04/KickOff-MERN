import React, { useEffect } from 'react';

const Popup = ({ title, content, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md max-h-[90vh] flex flex-col animate-scaleIn">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-indigo-600">{title}</h3>
          <button 
            className="p-1 text-indigo-600 hover:text-indigo-700 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto text-gray-700">
          {content}
        </div>
        
        <div className="p-4 border-t border-gray-200 text-right">
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;