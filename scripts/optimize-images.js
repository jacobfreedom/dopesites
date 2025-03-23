import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Directories containing images to optimize
const imageDirectories = [
  path.join(process.cwd(), 'public/images/w1'),
  path.join(process.cwd(), 'public/images/w2'),
  path.join(process.cwd(), 'public/og')
];

// WebP conversion options
const webpOptions = {
  quality: 80, // Adjust quality (0-100)
  lossless: false
};

// Function to process a single image
async function processImage(imagePath) {
  try {
    const fileInfo = path.parse(imagePath);
    const outputPath = path.join(fileInfo.dir, `${fileInfo.name}.webp`);
    
    console.log(`Converting: ${imagePath}`);
    
    await sharp(imagePath)
      .webp(webpOptions)
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
async function optimizeImages() {
  console.log('Starting image optimization...');
  
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
        
        if (stats.isFile() && /\.(png|jpg|jpeg)$/i.test(file)) {
          await processImage(filePath);
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${directory}:`, error);
    }
  }
  
  console.log('Image optimization complete!');
}

// Run the optimization
optimizeImages();