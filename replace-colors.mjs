import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace colors
  content = content.replace(/#080810/gi, '#2b2b2b');
  content = content.replace(/#1a1a24/gi, '#3b3b3b'); // slightly lighter background variant if needed
  content = content.replace(/#f5c842/gi, '#ffffff'); // Accent -> White
  content = content.replace(/#f0f0f0/gi, '#d4d4d4'); // Main text -> Light Gray
  content = content.replace(/#b0b0c0/gi, '#b3b3b3'); // Muted text -> Med Gray
  content = content.replace(/#808090/gi, '#b3b3b3'); // Muted text -> Med Gray
  content = content.replace(/#a0a0b0/gi, '#b3b3b3'); // Muted text -> Med Gray
  content = content.replace(/#606070/gi, '#b3b3b3'); // Muted text -> Med Gray
  content = content.replace(/#555555/gi, '#b3b3b3'); // Muted text -> Med Gray
  content = content.replace(/#555/gi, '#b3b3b3'); // Muted text -> Med Gray
  
  fs.writeFileSync(filePath, content, 'utf8');
}

function walkPath(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkPath(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      replaceInFile(fullPath);
    }
  }
}

walkPath('/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src');
console.log('Colors replaced successfully!');
