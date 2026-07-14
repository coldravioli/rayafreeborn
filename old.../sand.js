const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Config
const CHUNK_SIZE = 6;
const GRAVITY = 0.3;
const HOLD_FRAMES = 120;
let elapsed = 0;

let particles = [];
let pileHeight = new Array(width).fill(height);

function createParticlesFromText(text) {
  particles = [];
  pileHeight = new Array(width).fill(height);

  const fontSize = Math.min(120, width / text.length * 1.2);
  const offCanvas = document.createElement('canvas');
  const offCtx = offCanvas.getContext('2d');
  offCanvas.width = width;
  offCanvas.height = height;

  offCtx.font = `bold ${fontSize}px Montserrat`;
  offCtx.textAlign = "center";
  offCtx.fillStyle = "#8fa4d8";
  offCtx.fillText(text, width/2, fontSize * 1.2);

  const imageData = offCtx.getImageData(0, 0, width, height);
  const data = imageData.data;

  let maxY = 0;
  for (let y = 0; y < height; y += CHUNK_SIZE) {
    for (let x = 0; x < width; x += CHUNK_SIZE) {
      const index = (y*width + x)*4;
      if (data[index+3] > 128 && y > maxY) maxY = y;
    }
  }

  for (let y = 0; y < height; y += CHUNK_SIZE) {
    for (let x = 0; x < width; x += CHUNK_SIZE) {
      const index = (y*width + x)*4;
      if (data[index+3] > 128) {
        particles.push({
          x: x,
          y: y,
          vy: 0,
          chunkSize: CHUNK_SIZE,
          settled: false,
          active: false,
          delay: HOLD_FRAMES + (maxY - y) + Math.random()*20,
          jitter: (Math.random()-0.5)*1.5
        });
      }
    }
  }
}

function animate() {
  ctx.clearRect(0,0,width,height);
  elapsed++;

  let allSettled = true;
  particles.forEach(p => {
    if (!p.active && !p.settled && elapsed >= p.delay) p.active = true;

    if (p.active && !p.settled) {
      p.vy += GRAVITY;
      p.y += p.vy;
      p.x += p.jitter;

      if (p.x < 0) p.x = 0;
      if (p.x > width-CHUNK_SIZE) p.x = width-CHUNK_SIZE;

      const floorY = Math.floor(p.x);
      if (p.y + p.chunkSize > pileHeight[floorY]) {
        p.y = pileHeight[floorY] - p.chunkSize;
        p.vy = 0;
        p.settled = true;
        p.active = false;

        const distanceFromCenter = Math.abs(p.x - width/2);
        pileHeight[floorY] -= p.chunkSize - distanceFromCenter*0.002;
      }
    }

    ctx.fillStyle = "#8fa4d8";
    ctx.fillRect(p.x, p.y, p.chunkSize, p.chunkSize);

    if (!p.settled) allSettled = false;
  });

  requestAnimationFrame(animate);
}