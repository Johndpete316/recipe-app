// SeparatorLine.tsx
import React from 'react';

const SeparatorLine: React.FC = () => {
  return (
    <svg className="separator-line" width="100%" height="1">
      <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
};

export default SeparatorLine;
