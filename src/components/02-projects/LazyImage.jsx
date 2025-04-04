import React, { useState, useEffect, useRef } from 'react';

export default function LazyImage({ src, alt, className, priority = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [placeholderError, setPlaceholderError] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  
  if (!src) {
    return null;
  }
  
  const placeholderSrc = src.replace(/\.(webp|png)$/, '-placeholder.webp');
  
  useEffect(() => {
    if (priority) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.01
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, [priority]);
  
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  const handlePlaceholderError = () => {
    setPlaceholderError(true);
  };

  return (
    <div 
      ref={containerRef}
      className={`lazy-image-container ${className || ''}`}
    >
      {!placeholderError && (
        <img
          src={placeholderSrc}
          alt=""
          className={`lazy-image-placeholder ${isLoaded ? 'lazy-image-hidden' : ''}`}
          aria-hidden="true"
          loading="eager"
          onError={handlePlaceholderError}
        />
      )}
      
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`lazy-image-main ${isLoaded ? 'lazy-image-visible' : ''}`}
          onLoad={handleImageLoaded}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      )}
    </div>
  );
};