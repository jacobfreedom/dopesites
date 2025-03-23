import React, { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const placeholderSrc = src.replace(/\.(png|webp)$/, '-placeholder.webp');
  
  // Use the original src as fallback if the webp version fails
  const originalSrc = src.includes('.webp') ? src.replace(/\.webp$/, '.png') : src;

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