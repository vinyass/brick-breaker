import { detectCollision } from "./collisionDetection.js";

export default class Ball {
  constructor(game) {
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;

    this.game = game;

    this.size = 16;

    this.ball = document.getElementById("gameBall");
    this.reset();
  }

  reset() {
    this.position = {
      x: 10,
      y: 400,
    };
    this.speed = {
      x: 5,
      y: -3,
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.ball,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // detect collisions on top wall
    if (this.position.y < 0) {
      this.speed.y *= -1;
    }
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }
    if (this.position.x < 0 || this.position.x + this.size > this.gameWidth) {
      this.speed.x *= -1;
    }

    //detect collision on pedal
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
