import { SVG_NS, RANDOM, MIN_BALL_RADIUS, MAX_BALL_RADIUS, RIGHT_DIRECTION } from '../settings'
import PingSound from '../../public/sounds/pong-01.wav';
import PingFireSound from '../../public/sounds/pong-02.wav';

export default class Ball {
    constructor(boardWidth, boardHeight) {
        this.radius = RANDOM(MIN_BALL_RADIUS, MAX_BALL_RADIUS);
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = RIGHT_DIRECTION;
        this.ping = new Audio(PingSound);
        this.pingFire = new Audio(PingFireSound);
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

    shotCollision(shot) {
        if (shot.isFired()) {
            const shotCoodinates = shot.getCoordinates();
            const hitTop = (this.y + this.radius >= shotCoodinates.top) && (this.y - this.radius <= shotCoodinates.top) && (this.x + this.radius >= shotCoodinates.left) && (this.x + this.radius <= shotCoodinates.right);
            const hitBottom = (this.y + this.radius >= shotCoodinates.bottom) && (this.y - this.radius <= shotCoodinates.bottom) && (this.x + this.radius >= shotCoodinates.left) && (this.x + this.radius <= shotCoodinates.right);
            const hitRight = (this.x - this.radius <= shotCoodinates.right) && (this.x + this.radius >= shotCoodinates.right) && (this.y + this.radius >= shotCoodinates.top) && (this.y + this.radius <= shotCoodinates.bottom);
            const hitLeft = (this.x + this.radius >= shotCoodinates.left) && (this.x - this.radius <= shotCoodinates.left) && (this.y + this.radius >= shotCoodinates.top) && (this.y + this.radius <= shotCoodinates.bottom);

            if (hitTop) {
                this.y = shotCoodinates.top - this.radius;
                this.changeDirection();
                this.pingFire.play();
            } else if (hitBottom) {
                this.y = shotCoodinates.bottom + this.radius;
                this.changeDirection();
                this.pingFire.play();
            } else if (hitRight && shot.getDirection() > 0 && this.vx < 0) {
                this.x = shotCoodinates.right + this.radius;
                this.changeDirection();
                this.pingFire.play();
            } else if (hitLeft && shot.getDirection() < 0 && this.vx > 0) {
                this.x = shotCoodinates.left - this.radius;
                this.changeDirection();
                this.pingFire.play();
            }

        }
    }

    changeDirection() {
        this.vx *= -1;
        this.vy *= -1;
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

    render(svg, paddle1, paddle2, shot1, shot2) {
        const ball = document.createElementNS(SVG_NS, "circle");
        ball.setAttributeNS(null, "r", this.radius);
        ball.setAttributeNS(null, "cx", this.x);
        ball.setAttributeNS(null, "cy", this.y);
        ball.setAttributeNS(null, "style", `fill: ${this.color}`);

        svg.appendChild(ball);
        this.ballMove();
        this.wallCollision(paddle1, paddle2);
        this.paddleCollision(paddle1, paddle2);
        this.shotCollision(shot1);
        this.shotCollision(shot2);
    }
}