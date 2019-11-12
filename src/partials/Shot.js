import { SVG_NS } from '../settings'

export default class Shot {
    constructor(width, height, direction) {
        this.width = width;
        this.height = height;
        this.x = 200;
        this.y = 128;
        this.speed = 2;
        this.direction = direction;
        this.reset();
    }

    reset() {
        this.fired = false;
    }

    shotMove() {
        this.x += (this.speed*this.direction);

    }

    fire(paddle) {
        if (this.direction === 1) {
            this.x = paddle.getCoordinates().right;
        } else {
            this.x = paddle.getCoordinates().left - this.width;
            console.log('teste1');    
        }
        this.y = paddle.getCoordinates().middle;
        this.fired = true;
    }

    isFired() {
        return this.fired;
    }

    render(svg) {
        const shot = document.createElementNS(SVG_NS, "rect");
        shot.setAttributeNS(null, "width", this.width);
        shot.setAttributeNS(null, "height", this.height);
        shot.setAttributeNS(null, "x", this.x);
        shot.setAttributeNS(null, "y", this.y);
        shot.setAttributeNS(null, "fill", "red");
        shot.setAttributeNS(null, "visibility", this.fired ? "visible" : "hidden");

        svg.appendChild(shot);

        if (this.isFired()){
            this.shotMove();
        }
    }

}