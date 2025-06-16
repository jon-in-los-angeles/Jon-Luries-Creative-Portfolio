import fs from 'fs';
import { createCanvas } from 'canvas';

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background with rounded corners
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(0, 0, size, size);
  
  // White circle
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(size/2, size/2, size*0.375, 0, 2 * Math.PI);
  ctx.fill();
  
  // Text
  ctx.fillStyle = '#3b82f6';
  ctx.font = `bold ${Math.floor(size/3)}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JL', size/2, size/2);
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`client/public/icon-${size}.png`, buffer);
  console.log(`Generated icon-${size}.png`);
}

// Generate both icon sizes
generateIcon(192);
generateIcon(512);

console.log('Icons generated successfully!');