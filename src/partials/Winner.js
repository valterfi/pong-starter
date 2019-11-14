import { SVG_NS } from '../settings'

export default class Winner {
    constructor(size) {
        this.x = 60;
        this.y = 148;
        this.size = size;
    }

    render(svg, winner) {
        const winnerElement = document.createElementNS(SVG_NS, "text");
        winnerElement.setAttributeNS(null, "x", this.x);
        winnerElement.setAttributeNS(null, "y", this.y);
        winnerElement.setAttributeNS(null, "font-size", this.size);
        winnerElement.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
        winnerElement.setAttributeNS(null, "fill", "orange");

        winnerElement.textContent = `${winner} wins`;

        svg.appendChild(winnerElement);
    }

}