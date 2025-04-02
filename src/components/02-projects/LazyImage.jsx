import React from 'react';

export default function LazyImage({ src, alt, className }) {
  if (!src) {
    return null;
  }
  
  return (
    <div className={`lazy-image-container ${className || ''}`}>
      <img
        src={src}
        alt={alt}
        className="lazy-image-main lazy-image-visible"
        loading="lazy"
      />
    </div>
  );
};