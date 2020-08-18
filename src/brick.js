import { detectCollision } from "./collisionDetection.js";

export default class Brick {
  constructor(game, position) {
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;

    this.game = game;

    this.position = position;
    this.width = 80;
    this.height = 24;
    this.brickImage = document.getElementById("gameBrick");

    this.markedForDeletion = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.brickImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }
  }
}
