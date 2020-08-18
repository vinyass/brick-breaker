import Game from "./game.js";

const canvas = document.getElementById("gameScreen");

const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);

let currentTime = 0;

function gameLoop(time) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_WIDTH);
  const deltaTime = time - currentTime;
  currentTime = time;
  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
