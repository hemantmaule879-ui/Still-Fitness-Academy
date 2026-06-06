'use client';

import React, { useState } from 'react';
import EnquiryModal from './EnquiryModal';

interface HomeCtasProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function HomeCtas({ className, style }: HomeCtasProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'enquiry' | 'demo'>('enquiry');

  const openModal = (type: 'enquiry' | 'demo') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      <div className={className} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', ...style }}>
        <button onClick={() => openModal('enquiry')} className="btn btn-primary">
          Join Now
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </button>
        <button onClick={() => openModal('demo')} className="btn btn-saffron">
          Free Demo Class
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </button>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </>
  );
}
