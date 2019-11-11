import { SVG_NS, RANDOM, MIN_BALL_RADIUS, MAX_BALL_RADIUS } from '../settings'
import PingSound from '../../public/sounds/pong-01.wav';

export default class Ball {
    constructor(boardWidth, boardHeight) {
        this.radius = RANDOM(MIN_BALL_RADIUS, MAX_BALL_RADIUS);
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.ping = new Audio(PingSound);
        this.color = 'rgb(' + RANDOM(0, 255) + ',' + RANDOM(0, 255) + ',' + RANDOM(0, 255) + ')';
        this.reset();
    }

    ballMove() {
        this.x += this.vx;
        this.y += this.vy;
    }

    wallCollision(paddle1, paddle2) {
        const hitTop = (this.y - this.radius <= 0);
        const hitBottom = (this.y + this.radius >= this.boardHeight);
        const hitLeft = (this.x + this.radius < 0);
        const hitRight = (this.x - this.radius > this.boardWidth);
        if (hitTop || hitBottom) {
            this.vy *= -1;
        }
        if (hitLeft) {
            this.direction = 1;
            paddle2.increaseScore();
            this.reset();
        } else if (hitRight) {
            this.direction = -1;
            paddle1.increaseScore();
            this.reset();
        }

    }

    paddleCollision(paddle1, paddle2) {
        let hitWall = false, checkTop = false, checkBottom = false;
        if (this.vx > 0) {
            const p2Walls = paddle2.getCoordinates();
            hitWall = (this.x + this.radius >= p2Walls.left);
            checkTop = (this.y - this.radius >= p2Walls.top)
            checkBottom = (this.y + this.radius < p2Walls.bottom)
        } else {
            const p1Walls = paddle1.getCoordinates();
            hitWall = (this.x - this.radius <= p1Walls.right);
            checkTop = (this.y - this.radius >= p1Walls.top)
            checkBottom = (this.y + this.radius <= p1Walls.bottom)
        }

        if (hitWall && checkTop && checkBottom) {
            this.ping.play();
            this.vx *= -1;
        }
    }

    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        this.vy = 0;
        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10) - 5; //min value = -5 and max value = 5
        }
        this.vx = this.direction * (6 - Math.abs(this.vy));
        //vx vy  vx vy
        //-5 1   1 5
        //-4 2   2 4
        //-3 3   3 3
        //-2 4   4 2  
        //-1 5   5 1
    }

    render(svg, paddle1, paddle2) {
        const ball = document.createElementNS(SVG_NS, "circle");
        ball.setAttributeNS(null, "r", this.radius);
        ball.setAttributeNS(null, "cx", this.x);
        ball.setAttributeNS(null, "cy", this.y);
        ball.setAttributeNS(null, "style", `fill: ${this.color}`);

        svg.appendChild(ball);
        this.ballMove();
        this.wallCollision(paddle1, paddle2);
        this.paddleCollision(paddle1, paddle2);
    }
}