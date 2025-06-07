const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const box = 20;
const rows = canvas.height / box;
const cols = canvas.width / box;

let snake = [{ x: 10 * box, y: 10 * box }];
let food = spawnFood();
let dx = box, dy = 0;

document.addEventListener("keydown", direction);

function direction(e) {
  if (e.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
  else if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
  else if (e.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
  else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  for (let segment of snake) {
    ctx.fillRect(segment.x, segment.y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over");
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
  } else {
    snake.pop();
  }
}

const game = setInterval(draw, 100);
