const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
const optimizedDir = path.join(__dirname, 'src', 'assets', 'images', 'optimized');

// List of optimized images
const optimizedImages = [
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

function replaceImages() {
  console.log('🔄 Replacing original images with optimized versions...\n');
  
  let replacedCount = 0;
  let totalSizeReduction = 0;
  
  optimizedImages.forEach(imageName => {
    const originalPath = path.join(imagesDir, imageName);
    const optimizedPath = path.join(optimizedDir, imageName);
    
    if (fs.existsSync(optimizedPath)) {
      if (fs.existsSync(originalPath)) {
        // Backup original
        const backupPath = path.join(imagesDir, `backup_${imageName}`);
        fs.copyFileSync(originalPath, backupPath);
        
        // Get sizes
        const originalSize = fs.statSync(originalPath).size;
        const optimizedSize = fs.statSync(optimizedPath).size;
        
        // Replace original with optimized
        fs.copyFileSync(optimizedPath, originalPath);
        
        const reduction = originalSize - optimizedSize;
        totalSizeReduction += reduction;
        replacedCount++;
        
        console.log(`✅ ${imageName}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB (${((reduction / originalSize) * 100).toFixed(1)}% reduction)`);
      } else {
        console.log(`⚠️  Original ${imageName} not found, copying optimized version...`);
        fs.copyFileSync(optimizedPath, originalPath);
        replacedCount++;
      }
    } else {
      console.log(`❌ Optimized ${imageName} not found`);
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`Replaced ${replacedCount} images`);
  console.log(`Total size reduction: ${(totalSizeReduction / 1024 / 1024).toFixed(2)}MB`);
  console.log(`\n💾 Original images backed up with 'backup_' prefix`);
  console.log(`🚀 Your website should now load much faster!`);
}

// Run the replacement
replaceImages(); 