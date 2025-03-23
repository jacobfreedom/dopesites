import React, { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, className }) => {
  // Return null if src is empty to prevent browser from downloading the whole page
  if (!src) {
    return null;
  }
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src); // Initialize with src instead of empty string
  const placeholderSrc = src ? src.replace(/\.(png|webp)$/, '-placeholder.webp') : null;
  
  // Use the original src as fallback if the webp version fails
  const originalSrc = src && src.includes('.webp') ? src.replace(/\.webp$/, '.png') : src;

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setImgSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // If webp fails, try the original format
    if (imgSrc !== originalSrc) {
      setImgSrc(originalSrc);
    }
  };

  return (
    <div className={`lazy-image-container ${className || ''}`}>
      {/* Placeholder image (blurred version) */}
      <img 
        src={placeholderSrc} 
        alt={alt}
        className={`lazy-image-placeholder ${isLoaded ? 'lazy-image-hidden' : ''}`}
        onError={(e) => {
          // If placeholder fails, make it transparent
          e.target.style.display = 'none';
        }}
      />
      {/* Main image */}
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

export default LazyImage;