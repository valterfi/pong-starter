export const SVG_NS = "http://www.w3.org/2000/svg";
export const BOARD_COLOR = "#353535";
export const BOARD_WIDTH = 512;
export const BOARD_HEIGHT = 256;

export const PADDLE_WIDTH = 8;
export const PADDLE_HEIGHT = 56;
export const PADDLE_GAP = 10;
export const PADDLE_SPEED = 23;
export const MIN_BALL_RADIUS = 8;
export const MAX_BALL_RADIUS = 16;

export const TEXT_SIZE = 30;

export const KEYS = {
    p1Up: "w",
    p1Down: "s",
    p1Fire: "d",
    p2Up: "ArrowUp",
    p2Down: "ArrowDown",
    p2Fire: "ArrowLeft",
    pause: " "
}

export const RANDOM = function (min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}