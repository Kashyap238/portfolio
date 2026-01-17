const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Background animation (lighter)
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = Array.from({ length: 40 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  dx: Math.random() - 0.5,
  dy: Math.random() - 0.5
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    ctx.fillStyle = "rgba(34,211,238,0.6)";
    ctx.fillRect(p.x, p.y, 2, 2);
  });
  requestAnimationFrame(animate);
}
animate();
