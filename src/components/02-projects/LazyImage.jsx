import React, { useState, useRef, useEffect } from 'react';

function LazyImage({ src, alt, className, priority }) {
  const [placeholderError, setPlaceholderError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);
  const placeholderRef = useRef(null);

  if (!src) {
    return null;
  }

  // Get the placeholder source
  const placeholderSrc = src.replace(/\.(webp|png)$/, '-placeholder.webp');

  // Handle placeholder image error
  const handlePlaceholderError = () => {
    setPlaceholderError(true);
  };

  // Handle main image load completion
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  // Preload priority images immediately
  useEffect(() => {
    if (priority && src) {
      // For priority images, trigger immediate loading
      const img = new Image();
      img.src = src;
    }
  }, [priority, src]);

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
}

export default LazyImage;