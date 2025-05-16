import React, { useState, useRef, useEffect, memo } from 'react';

const LazyImage = memo(function LazyImage({ src, alt, className, priority }) {
  const [placeholderError, setPlaceholderError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);
  const placeholderRef = useRef(null);

  if (!src) {
    return null;
  }

  // Memoize the placeholder source to prevent recalculation on re-renders
  const placeholderSrc = src.replace(/\.(webp|png)$/, '-placeholder.webp');

  // Handle placeholder image error
  const handlePlaceholderError = () => {
    setPlaceholderError(true);
  };

  // Handle main image load completion
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className={`lazy-image-container ${className || ''}`}
    >
      {!placeholderError && !imageLoaded && (
        <img
          ref={placeholderRef}
          src={placeholderSrc}
          alt=""
          className="lazy-image-placeholder"
          aria-hidden="true"
          loading="eager"
          onError={handlePlaceholderError}
        />
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`lazy-image-main ${imageLoaded ? 'loaded' : ''}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={handleImageLoad}
      />
    </div>
  );
});

export default LazyImage;