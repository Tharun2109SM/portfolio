const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function processImage(inputPath, outputPath) {
  try {
    const image = await loadImage(inputPath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(image, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Iterate through every pixel
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // Calculate perceptive luminance/brightness to detect background
      // The background in the images is very close to white, tinted slightly purple/pink
      // R: > 240, G: > 240, B: > 240 is a safe threshold for the background
      
      if (r > 235 && g > 235 && b > 235) {
        // Replace with pure white (or we could make it transparent: a = 0)
        data[i] = 255;     // R
        data[i + 1] = 255; // G
        data[i + 2] = 255; // B
        data[i + 3] = 255; // Alpha
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
  await processImage('ipad-image-1.jpg', 'ipad-image-1-clean.png');
  await processImage('ipad-image-2.jpg', 'ipad-image-2-clean.png');
}

main();
