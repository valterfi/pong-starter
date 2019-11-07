import { SVG_NS } from '../settings'

export default class Ball {
    constructor(radius, x, y) {
        this.radius = radius;
        this.x = x;
        this.y = y;;
    }

    render(svg) {
        const ball = document.createElementNS(SVG_NS, "circle");
        ball.setAttributeNS(null, "r", this.radius);
        ball.setAttributeNS(null, "cx", this.x);
        ball.setAttributeNS(null, "cy", this.y);
        ball.setAttributeNS(null, "fill", "white");

        svg.appendChild(ball);
    }
}