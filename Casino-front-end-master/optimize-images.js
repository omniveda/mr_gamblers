const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Install sharp if not already installed
try {
  require('sharp');
} catch (e) {
  console.log('Installing sharp for image optimization...');
  execSync('npm install sharp', { stdio: 'inherit' });
}

const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
const outputDir = path.join(__dirname, 'src', 'assets', 'images', 'optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Large images that need optimization
const largeImages = [
  'betting-bg.png',
  'home-bg.jpg',
  'casino-bg.png',
  'slots-bg.png',
  'games-bg.png',
  'lefteclipse.png',
  'righteclipse.png',
  'footer-bg.png',
  'login-bg.png'
];

async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const image = sharp(inputPath);
    
    // Get image info
    const metadata = await image.metadata();
    
    // Optimize based on file type and size
    if (metadata.format === 'png') {
      await image
        .png({ 
          quality: options.quality || 80,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toFile(outputPath);
    } else if (metadata.format === 'jpg' || metadata.format === 'jpeg') {
      await image
        .jpeg({ 
          quality: options.quality || 80,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);
    }
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB (${reduction}% reduction)`);
    
    return { originalSize, optimizedSize, reduction };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('🚀 Starting image optimization...\n');
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const imageName of largeImages) {
    const inputPath = path.join(imagesDir, imageName);
    const outputPath = path.join(outputDir, imageName);
    
    if (fs.existsSync(inputPath)) {
      const result = await optimizeImage(inputPath, outputPath, {
        quality: 80 // Good balance between quality and size
      });
      
      if (result) {
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
      }
    } else {
      console.log(`⚠️  ${imageName} not found, skipping...`);
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total reduction: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`\n💾 Optimized images saved to: ${outputDir}`);
  console.log('\n📝 Next steps:');
  console.log('1. Review the optimized images in the output directory');
  console.log('2. Replace the original images with optimized versions');
  console.log('3. Update any image references in your code if needed');
}

// Run the optimization
optimizeAllImages().catch(console.error); 