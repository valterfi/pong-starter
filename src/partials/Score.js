import { SVG_NS } from '../settings'

export default class Score {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    render(svg, score) {
        const scoreElement = document.createElementNS(SVG_NS, "text");
        scoreElement.setAttributeNS(null, "x", this.x);
        scoreElement.setAttributeNS(null, "y", this.y);
        scoreElement.setAttributeNS(null, "font-size", this.size);
        scoreElement.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
        scoreElement.setAttributeNS(null, "fill", "white");

        var scoreValue = document.createTextNode(score);
        scoreElement.appendChild(scoreValue);
        //scoreElement.textContent = score;

        svg.appendChild(scoreElement);
    }
}