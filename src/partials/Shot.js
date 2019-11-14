import { SVG_NS, RANDOM } from '../settings'
import FireSound from '../../public/sounds/pong-04.wav';

export default class Shot {
    constructor(boardWidth, direction) {
        this.speed = 2;
        this.boardWidth = boardWidth;
        this.direction = direction;
        this.fireAudio = new Audio(FireSound);
        this.reset();
    }

    reset() {
        this.fired = false;
    }

    shotMove() {
        this.x += (this.speed * this.direction);

    }

    fire(paddle) {
        this.width = RANDOM(8,32);
        this.height = RANDOM(8,32);;
        if (this.direction === 1) {
            this.x = paddle.getCoordinates().right;
        } else {
            this.x = paddle.getCoordinates().left - this.width;
        }
        this.y = paddle.getCoordinates().middle;
        this.fired = true;
        this.fireAudio.play();
    }

    isFired() {
        return this.fired;
    }

    isInsideBoard() {
        return (this.getCoordinates().right <= this.boardWidth && this.getCoordinates().left >= 0);
    }

    getCoordinates() {
        return {
            left: this.x,
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.height,
        }
    }

    getDirection() {
        return this.direction;
    }

    render(svg) {
        if (this.isFired() && this.isInsideBoard()) {
            const shot = document.createElementNS(SVG_NS, "rect");
            shot.setAttributeNS(null, "width", this.width);
            shot.setAttributeNS(null, "height", this.height);
            shot.setAttributeNS(null, "x", this.x);
            shot.setAttributeNS(null, "y", this.y);
            shot.setAttributeNS(null, "fill", "red");
            shot.setAttributeNS(null, "visibility", this.fired ? "visible" : "hidden");

            svg.appendChild(shot);

            this.shotMove();
        } else {
            this.reset();
        }
    }

}