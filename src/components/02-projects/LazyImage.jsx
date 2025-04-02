import React, { useState, useEffect } from 'react';

export default function LazyImage({ src, alt, className }) {
  if (!src) {
    return null;
  }
  const [imgSrc, setImgSrc] = useState(src);
  const originalSrc = src && src.includes('.webp') ? src.replace(/\.webp$/, '.png') : src;

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== originalSrc) {
      setImgSrc(originalSrc);
    }
  };

  return (
    <div className={`lazy-image-container ${className || ''}`}>
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        className="lazy-image-main"
        onError={handleError}
      />
    </div>
  );
};