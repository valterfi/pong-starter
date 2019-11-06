import {SVG_NS, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_GAP} from '../settings'
import Board from './Board'
import Paddle from './Paddle'

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    this.paddle1 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, PADDLE_GAP, (this.height/2) - (PADDLE_HEIGHT/2));
    this.paddle2 = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.height, (this.width-PADDLE_GAP-PADDLE_WIDTH), (this.height/2) - 28);

    // Other code goes here...
  }

  render() {
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
  }
}
