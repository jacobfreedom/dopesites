import React, { useState, useEffect } from 'react';

export default function LazyImage({ src, alt, className }) {
  if (!src) {
    return null;
  }
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

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