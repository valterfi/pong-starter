import {SVG_NS, BOARD_COLOR} from '../settings' 

export default class Board {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    render(svg) {
        const board = document.createElementNS(SVG_NS, "rect");
        board.setAttributeNS(null, "width", this.width);
        board.setAttributeNS(null, "height", this.height);
        board.setAttributeNS(null, "x", 0);
        board.setAttributeNS(null, "y", 0);
        board.setAttributeNS(null, "fill", BOARD_COLOR);

        const line = document.createElementNS(SVG_NS, "line");
        line.setAttributeNS(null, "x1", this.width/2);
        line.setAttributeNS(null, "y1", 0);
        line.setAttributeNS(null, "x2", this.width/2);
        line.setAttributeNS(null, "y2", this.height);
        line.setAttributeNS(null, "stroke", "white");
        line.setAttributeNS(null, "stroke-width", 4);
        line.setAttributeNS(null, "stroke-dasharray", "20, 15");

        svg.appendChild(board);
        svg.appendChild(line);
    }
  }