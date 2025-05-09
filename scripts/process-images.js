import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Directories containing images to process
const imageDirectories = [
  path.join(process.cwd(), 'public/images/w1'),
  path.join(process.cwd(), 'public/images/w2'),
  path.join(process.cwd(), 'public/images/w3'),
  path.join(process.cwd(), 'public/images/w4'),
  path.join(process.cwd(), 'public/images/w5'),
  path.join(process.cwd(), 'public/images/w6'),
  path.join(process.cwd(), 'public/images/w7'),
  path.join(process.cwd(), 'public/images/w8'),
];

// WebP conversion options
const webpOptions = {
  quality: 80, // Adjust quality (0-100)
  lossless: false
};

// Placeholder options
const placeholderOptions = {
  width: 20,      // Very small width for the placeholder
  quality: 30,    // Lower quality
  blur: 2,        // Apply blur
};

// Function to optimize a single image
async function optimizeImage(imagePath) {
  try {
    const fileInfo = path.parse(imagePath);
    const outputPath = path.join(fileInfo.dir, `${fileInfo.name}.webp`);
    
    // If WebP version exists, just delete the original and return the WebP path
    if (fs.existsSync(outputPath)) {
      console.log(`WebP already exists at: ${outputPath}`);
      if (fs.existsSync(imagePath) && fs.statSync(outputPath).size > 0) {
        fs.unlinkSync(imagePath);
        console.log(`Deleted original file: ${imagePath}`);
      }
      return outputPath;
    }
    
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
    
    // Delete the original file after successful conversion
    // Make sure the WebP file exists and has content before deleting the original
    if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
      fs.unlinkSync(imagePath);
      console.log(`Deleted original file: ${imagePath}`);
    } else {
      console.warn(`WebP file verification failed, keeping original: ${imagePath}`);
    }
    
    return outputPath;
  } catch (error) {
    console.error(`Error optimizing ${imagePath}:`, error);
    return null;
  }
}

// Function to generate a placeholder for a single image
async function generatePlaceholder(imagePath) {
  try {
    const fileInfo = path.parse(imagePath);
    const outputPath = path.join(fileInfo.dir, `${fileInfo.name}-placeholder.webp`);
    
    // Skip if the placeholder already exists
    if (fs.existsSync(outputPath)) {
      console.log(`Placeholder already exists, skipping: ${outputPath}`);
      return;
    }
    
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
    console.error(`Error generating placeholder for ${imagePath}:`, error);
  }
}

// Process all images in the directories
async function processImages() {
  console.log('Starting image processing...');
  
  // Step 1: Optimize images
  console.log('\n=== STEP 1: OPTIMIZING IMAGES ===');
  const optimizedImages = [];
  
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
          const optimizedPath = await optimizeImage(filePath);
          if (optimizedPath) {
            optimizedImages.push(optimizedPath);
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${directory}:`, error);
    }
  }
  
  // Step 2: Generate placeholders for optimized images
  console.log('\n=== STEP 2: GENERATING PLACEHOLDERS ===');
  
  // Process the optimized images we just created
  for (const imagePath of optimizedImages) {
    await generatePlaceholder(imagePath);
  }
  
  // Also check for any existing WebP images that might not have been processed in this run
  for (const directory of imageDirectories) {
    try {
      if (!fs.existsSync(directory)) {
        continue;
      }
      
      const files = fs.readdirSync(directory);
      
      for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isFile() && /\.webp$/i.test(file) && !file.includes('-placeholder')) {
          // Skip files we already processed in this run
          if (!optimizedImages.includes(filePath)) {
            await generatePlaceholder(filePath);
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${directory} for placeholders:`, error);
    }
  }
  
  console.log('\nImage processing complete!');
}

// Run the image processing
processImages();