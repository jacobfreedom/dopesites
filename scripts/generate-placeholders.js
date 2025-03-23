import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Directories containing images to process
const imageDirectories = [
  path.join(process.cwd(), 'public/images/w1'),
  path.join(process.cwd(), 'public/images/w2')
];

// Placeholder options
const placeholderOptions = {
  width: 20,      // Very small width for the placeholder
  quality: 30,    // Lower quality
  blur: 2,        // Apply blur
};

// Function to process a single image
async function processImage(imagePath) {
  try {
    const fileInfo = path.parse(imagePath);
    // Only process webp images (which we already have from the optimize-images script)
    if (fileInfo.ext.toLowerCase() !== '.webp') {
      return;
    }
    
    const outputPath = path.join(fileInfo.dir, `${fileInfo.name}-placeholder.webp`);
    
    console.log(`Generating placeholder: ${imagePath}`);
    
    await sharp(imagePath)
      .resize(placeholderOptions.width) // Resize to a very small width
      .blur(placeholderOptions.blur)    // Apply blur
      .webp({ quality: placeholderOptions.quality }) // Lower quality
      .toFile(outputPath);
    
    console.log(`Created: ${outputPath}`);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(imagePath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
    
    console.log(`Size reduction: ${savings}% (${(originalSize/1024).toFixed(2)}KB → ${(newSize/1024).toFixed(2)}KB)`);
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error);
  }
}

// Process all images in the directories
async function generatePlaceholders() {
  console.log('Starting placeholder generation...');
  
  for (const directory of imageDirectories) {
    try {
      if (!fs.existsSync(directory)) {
        console.warn(`Directory not found: ${directory}`);
        continue;
      }
      
      const files = fs.readdirSync(directory);
      
      for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isFile() && /\.webp$/i.test(file)) {
          await processImage(filePath);
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${directory}:`, error);
    }
  }
  
  console.log('Placeholder generation complete!');
}

// Run the placeholder generation
generatePlaceholders();