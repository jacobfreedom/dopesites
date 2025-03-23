import React, { useEffect, useState } from 'react';

const FontPreloader = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Create a set of font faces to load
    const fontFaces = [
      new FontFace('ClashDisplay-Regular', `url(/fonts/ClashDisplay-Regular.woff2) format('woff2')`),
      new FontFace('ClashDisplay-Medium', `url(/fonts/ClashDisplay-Medium.woff2) format('woff2')`)
    ];

    // Load all fonts
    Promise.all(fontFaces.map(font => font.load().then(loadedFont => document.fonts.add(loadedFont))))
      .then(() => {
        setFontsLoaded(true);
        console.log('All fonts loaded successfully');
      })
      .catch(error => {
        console.error('Error loading fonts:', error);
        // Still show content even if fonts fail to load
        setFontsLoaded(true);
      });
  }, []);

  // Show loading state or children based on font loading status
  return fontsLoaded ? children : <div style={{ visibility: 'hidden' }}>Loading...</div>;
};

export default FontPreloader;