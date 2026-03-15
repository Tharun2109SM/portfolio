const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function processImage(inputPath, outputPath, isBackImage = false) {
  try {
    const image = await loadImage(inputPath);
    
    // For the back image, the side profile is on the right.
    // However, my previous crop of 52% from x=0 chopped the actual phone in half.
    // Looking at the original image, there's a lot of transparent whitespace.
    // The image is 1024x576. Let's crop it to 65% of the width, from x=200 width to target just the phone.
    // Instead of guessing, let's keep the original dimensions but manually erase the right side of the canvas where the side profile is.
    
    const width = image.width;
    const height = image.height;
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(image, 0, 0);
    
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
      
      // 1. Remove background tint (near white)
      if (r > 230 && g > 230 && b > 230) {
        data[i + 3] = 0; // Transparent
      }
      
      // 2. Erase the side profile from the back image specifically.
      // The back image has the main phone on the left, and the side profile sitting further right.
      // We will erase everything on the right half of the image aggressively if it's the back image.
      if (isBackImage && x > width * 0.55) {
        data[i + 3] = 0; // Transparent
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Successfully processed ${inputPath} to ${outputPath}`);
    
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function main() {
  await processImage('iphone-16-front.png', 'iphone-16-front-clean.png', false);
  await processImage('iphone-16-back.png', 'iphone-16-back-clean.png', true);
}

main();
