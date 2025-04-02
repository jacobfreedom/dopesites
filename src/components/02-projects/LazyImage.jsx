import React, { useState, useEffect } from 'react';

export default function LazyImage({ src, alt, className }) {
  if (!src) {
    return null;
  }
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const placeholderSrc = src ? src.replace(/\.(png|webp)$/, '-placeholder.webp') : null;
  
  const originalSrc = src && src.includes('.webp') ? src.replace(/\.webp$/, '.png') : src;

  useEffect(() => {
    setIsLoaded(false);
    setImgSrc(src);
  }, [src]);

  const handleLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  };

  const handleError = () => {
    if (imgSrc !== originalSrc) {
      setImgSrc(originalSrc);
    }
  };

  return (
    <div className={`lazy-image-container ${className || ''}`}>
      {placeholderSrc && (
        <img 
          src={placeholderSrc} 
          alt={alt}
          className={`lazy-image-placeholder ${isLoaded ? 'lazy-image-hidden' : ''}`}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`lazy-image-main ${isLoaded ? 'lazy-image-visible' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};