const canvas = document.getElementById('dino');
const ctx = canvas.getContext('2d');

let dino = { x: 50, y: 110, width: 40, height: 40, vy: 0, jumping: false };
let gravity = 2;
let obstacles = [];
let score = 0;
let speed = 5;

document.addEventListener('keydown', function(e) {
  if (e.key === ' ' && !dino.jumping) {
    dino.vy = -25;
    dino.jumping = true;
  }
});

function spawnObstacle() {
  obstacles.push({ x: canvas.width, width: 20, height: 40 });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dino.y += dino.vy;
  dino.vy += gravity;
  if (dino.y >= 110) {
    dino.y = 110;
    dino.jumping = false;
  }
  ctx.fillStyle = "black";
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

  if (Math.random() < 0.02) spawnObstacle();

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= speed;
    ctx.fillRect(obstacles[i].x, 110, obstacles[i].width, obstacles[i].height);
    if (
      dino.x < obstacles[i].x + obstacles[i].width &&
      dino.x + dino.width > obstacles[i].x &&
      dino.y < 110 + obstacles[i].height &&
      dino.y + dino.height > 110
    ) {
      alert("Game Over. Score: " + score);
      document.location.reload();
    }
  }

  score++;
  ctx.fillText("Score: " + score, 10, 10);
}

setInterval(update, 30);
