const fs = require('fs');

const width = 1600;
const height = 60;

// Attempt realistic torn paper with organic curves + fiber spikes
function generateTornLine(baseY, amplitude) {
  let pts = [];
  let y = baseY;
  
  for (let x = 0; x <= width; x += 1) {
    // Slow drift (large curves in paper tear)
    let drift = Math.sin(x * 0.003) * amplitude * 1.2
              + Math.sin(x * 0.007 + 1.3) * amplitude * 0.7
              + Math.sin(x * 0.013 + 0.7) * amplitude * 0.4;
    
    // Medium variation (smaller rips)
    let medium = Math.sin(x * 0.04 + 2.1) * 2.5
               + Math.sin(x * 0.08 + 0.5) * 1.2;
    
    // Fine detail (tiny fiber-level noise)
    let fine = (Math.random() - 0.5) * 1.8;
    
    // Random fiber spikes (occasional sharp peaks)
    let spike = 0;
    if (Math.random() < 0.008) {
      spike = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 5);
    }
    
    y = baseY + drift + medium + fine + spike;
    pts.push({ x, y: Math.max(2, Math.min(height - 2, y)) });
  }
  
  // Smooth the spikes slightly so they look like fibers, not glitches
  for (let i = 1; i < pts.length - 1; i++) {
    let prev = pts[i-1].y;
    let curr = pts[i].y;
    let next = pts[i+1].y;
    // Only smooth if it's not a spike
    let diff = Math.abs(curr - (prev + next) / 2);
    if (diff < 3) {
      pts[i].y = curr * 0.6 + (prev + next) / 2 * 0.4;
    }
  }
  
  // Blend edges for seamless tiling
  let blendZone = 80;
  for (let i = 0; i < blendZone; i++) {
    let t = i / blendZone;
    let endIdx = pts.length - blendZone + i;
    let avg = (pts[i].y + pts[endIdx].y) / 2;
    pts[i].y = pts[i].y * t + avg * (1 - t);
    pts[endIdx].y = pts[endIdx].y * (1 - t) + avg * t;
  }
  
  return pts;
}

function ptsToPath(pts) {
  // Use quadratic curves for smoother lines
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L${pts[i].x},${pts[i].y.toFixed(1)}`;
  }
  return d;
}

// ============ TOP TORN EDGE ============
// Paper fills from top (y=0) down to the torn line, rest is transparent
let topLine = generateTornLine(40, 6);
let topFiberLine = generateTornLine(42, 5); // Slightly below for white fibers

let topPaperPath = `M0,0 L${width},0 L${width},${topLine[topLine.length-1].y.toFixed(1)} ${ptsToPath([...topLine].reverse()).replace('M','L')} Z`;
let topFiberPath = `M0,0 L${width},0 L${width},${topFiberLine[topFiberLine.length-1].y.toFixed(1)} ${ptsToPath([...topFiberLine].reverse()).replace('M','L')} Z`;

const svgTop = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
  <!-- White fiber layer (slightly below paper edge) -->
  <path d="${topFiberPath}" fill="#FFFFFF" />
  <!-- Main paper surface -->
  <path d="${topPaperPath}" fill="#F3ECE0" />
</svg>`;

// ============ BOTTOM TORN EDGE ============
// Paper fills from bottom (y=height) up to the torn line
let botLine = generateTornLine(20, 6);
let botFiberLine = generateTornLine(18, 5); // Slightly above for white fibers

let botPaperPath = `M0,${height} L${width},${height} L${width},${botLine[botLine.length-1].y.toFixed(1)} ${ptsToPath([...botLine].reverse()).replace('M','L')} Z`;
let botFiberPath = `M0,${height} L${width},${height} L${width},${botFiberLine[botFiberLine.length-1].y.toFixed(1)} ${ptsToPath([...botFiberLine].reverse()).replace('M','L')} Z`;

const svgBottom = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
  <!-- White fiber layer (slightly above paper edge) -->
  <path d="${botFiberPath}" fill="#FFFFFF" />
  <!-- Main paper surface -->
  <path d="${botPaperPath}" fill="#F3ECE0" />
</svg>`;

fs.writeFileSync('public/torn-top.svg', svgTop);
fs.writeFileSync('public/torn-bottom.svg', svgBottom);
console.log('Realistic torn paper SVGs with fiber layers generated!');
