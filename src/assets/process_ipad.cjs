const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function processImage(inputPath, outputPath) {
  try {
    const image = await loadImage(inputPath);
    
    // The previous attempt changed the width of the canvas, which messed up the iPad centering/proportions.
    // Instead, we keep the exact original 1024x1024 canvas size.
    // We just iterate through the pixels and erase (make transparent) the right quarter of the image 
    // where the side-profile piece sits.
    
    const width = image.width;
    const height = image.height;
    
    console.log(`Processing ${inputPath}: original size ${image.width}x${image.height}`);
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Draw the full image
    ctx.drawImage(image, 0, 0, width, height);
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    // Iterate through every pixel
    for (let i = 0; i < data.length; i += 4) {
      const pixelIndex = i / 4;
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
      
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // 1. Erase background (white/off-white)
      if (r > 240 && g > 240 && b > 240) {
        data[i + 3] = 0; // Transparent
      }
      
      // 2. Erase the side profile sitting on the right.
      // The side profile starts around 80% of the way across the original 1024 pixel image.
      // Let's erase anything starting at x > 810 to ensure we wipe it out entirely without touching the main iPad.
      if (x > 800) {
        data[i + 3] = 0; // Transparent
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Successfully processed ${inputPath} to ${outputPath} without resizing canvas.`);
    
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function main() {
  await processImage('ipad-air-back.png', 'ipad-air-back-clean.png');
}

main();
