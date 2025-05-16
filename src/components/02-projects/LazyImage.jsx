import React, { useRef } from 'react';

function LazyImage({ src, alt, className, priority }) {
  const imgRef = useRef(null);
  const placeholderRef = useRef(null);

  if (!src) {
    return null;
  }

  // Get the placeholder source
  const placeholderSrc = src.replace(/\.(webp|png)$/, '-placeholder.webp');

  return (
    <div
      className={`lazy-image-container ${className || ''}`}
    >
      <img
        ref={placeholderRef}
        src={placeholderSrc}
        alt=""
        className="lazy-image-placeholder"
        aria-hidden="true"
        loading="eager"
      />

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
}

export default LazyImage;