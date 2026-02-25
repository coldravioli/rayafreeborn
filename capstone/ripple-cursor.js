const canvas = document.getElementById("ripple-cursor");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = "none"; // don’t block clicks
canvas.style.zIndex = 9999;

let ripples = [];

document.addEventListener("mousemove", (e) => {
  ripples.push({ x: e.clientX, y: e.clientY, radius: 0, alpha: 1 });
});

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 150, 255, ${r.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    r.radius += 2;      // speed of ripple expansion
    r.alpha -= 0.02;    // fade out

    if (r.alpha <= 0) {
      ripples.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();

// Update canvas size on window resize
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});