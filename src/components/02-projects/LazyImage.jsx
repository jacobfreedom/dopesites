import React, { useState, useRef } from 'react';

export default function LazyImage({ src, alt, className, priority }) {
  const [placeholderError, setPlaceholderError] = useState(false);
  const imgRef = useRef(null);

  if (!src) {
    return null;
  }

  const placeholderSrc = src.replace(/\.(webp|png)$/, '-placeholder.webp');

  const handlePlaceholderError = () => {
    setPlaceholderError(true);
  };

  return (
    <div
      className={`lazy-image-container ${className || ''}`}
    >
      {!placeholderError && (
        <img
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
        className="lazy-image-main"
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </div>
  );
};