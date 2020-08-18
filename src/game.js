import Paddle from "./paddle.js";
import Ball from "./ball.js";
import InputHandler from "./input.js";
import { buildLevel, level1, level2, level3 } from "./levels.js";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEW_LEVEL: 4,
  WIN: 5,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.gamestate = GAME_STATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
    this.levels = [level1, level2, level3];
    this.currentLevel = 0;
    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== GAME_STATE.MENU &&
      this.gamestate !== GAME_STATE.NEW_LEVEL
    ) {
      return;
    }
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.paddle, this.ball];
    this.gamestate = GAME_STATE.RUNNING;
  }

  draw(ctx) {
    [...this.bricks, ...this.gameObjects].forEach((obj) => obj.draw(ctx));
    if (this.gamestate === GAME_STATE.PAUSED) {
      this.renderText(ctx, "PAUSED", 0.5);
    }

    if (this.gamestate === GAME_STATE.MENU) {
      this.renderText(ctx, "Press SPACEBAR to Start");
    }

    if (this.gamestate === GAME_STATE.GAMEOVER) {
      this.renderText(ctx, "GAME OVER");
    }

    if (this.gamestate === GAME_STATE.WIN) {
      this.renderText(ctx, "YOU WIN");
    }
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAME_STATE.GAMEOVER;
    }
    if (
      this.gamestate === GAME_STATE.PAUSED ||
      this.gamestate === GAME_STATE.MENU ||
      this.gamestate === GAME_STATE.GAMEOVER ||
      this.gamestate === GAME_STATE.WIN
    ) {
      return;
    }
    if (this.bricks.length === 0) {
      if (this.currentLevel === this.levels.length - 1) {
        this.gamestate = GAME_STATE.WIN;
        return;
      }
      this.currentLevel++;
      this.gamestate = GAME_STATE.NEW_LEVEL;
      this.start();
    }
    [...this.bricks, ...this.gameObjects].forEach((obj) =>
      obj.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  togglePause() {
    if (this.gamestate === GAME_STATE.PAUSED) {
      this.gamestate = GAME_STATE.RUNNING;
    } else {
      this.gamestate = GAME_STATE.PAUSED;
    }
  }

  renderText(ctx, text, opacity = 1) {
    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = `rgba(0,0,0,${opacity})`;
    ctx.fill();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, this.gameWidth / 2, this.gameHeight / 2);
  }
}
