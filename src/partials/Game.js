import { SVG_NS, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_GAP, KEYS, BALL_RADIUS, PADDLE_SPEED, TEXT_SIZE } from '../settings'
import Board from './Board'
import Paddle from './Paddle'
import Ball from './Ball'
import Score from './Score'

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    const paddleYMid = (this.height - PADDLE_HEIGHT) / 2;
    const paddle2X = this.width - PADDLE_GAP - PADDLE_WIDTH;
    this.paddle1 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, PADDLE_GAP, paddleYMid, KEYS.p1Up, KEYS.p1Down);
    this.paddle2 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, paddle2X, paddleYMid, KEYS.p2Up, KEYS.p2Down);
    this.balls = this.initArrayBalls();
    this.score1 = new Score((this.width / 2) - 50, 30, TEXT_SIZE);
    this.score2 = new Score((this.width / 2) + 25, 30, TEXT_SIZE);
    this.paused = false;
    document.addEventListener("keydown", event => {
      if (event.key === KEYS.pause) {
        this.paddle1.setSpeed(PADDLE_SPEED);
        this.paddle2.setSpeed(PADDLE_SPEED);
        this.paused = !this.paused;
      }
    });
    // Other code goes here...
  }

  render() {
    if (this.shouldRenderGame()) {
      this.gameElement.innerHTML = '';

      // More code goes here....
      let svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttributeNS(null, "width", this.width);
      svg.setAttributeNS(null, "height", this.height);
      svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
      this.gameElement.appendChild(svg);

      this.board.render(svg);
      this.paddle1.render(svg);
      this.paddle2.render(svg);

      this.createBalls(svg, this.paddle1, this.paddle2);

      this.score1.render(svg, this.paddle1.getScore());
      this.score2.render(svg, this.paddle2.getScore());
    } else {
      this.paddle1.setSpeed(0);
      this.paddle2.setSpeed(0);
    }
  }

  shouldRenderGame() {
    return !this.paused && this.paddle1.getScore() < 10 && this.paddle2.getScore() < 10;
  }

  initArrayBalls() {
    let balls = [];
    for (let i = 0; i < 5; i++) {
      balls.push(new Ball(this.width, this.height));
    }
    return balls;
  }

  createBalls(svg) {
    let totalScore = this.paddle1.getScore() + this.paddle2.getScore();
      if (totalScore === 0) {
          this.balls[0].render(svg, this.paddle1, this.paddle2);
      } else {
         let qtd = Math.ceil(totalScore/4);
        for (let i = 0; i < qtd; i++) {
          this.balls[i].render(svg, this.paddle1, this.paddle2);
        }
      }
  }
}
