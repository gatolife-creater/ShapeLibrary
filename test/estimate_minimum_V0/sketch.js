let balls = [];
var fps = 60;
class Ball {
    constructor(x, y, d) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.t = 0;
    }

    estimateMinimumV0() {
        return 3 * Math.sqrt(this.d);
    }

    move() {
        const g = 9.8;
        const theta = 315;
        let Vx = this.estimateMinimumV0() * Math.cos(rad(theta));
        let Vy = this.estimateMinimumV0() * Math.sin(rad(theta));
        this.x = Vx * this.t;
        this.y = Vy * this.t + (1 / 2 * g * (this.t ** 2));
        this.t += 1;
    }

    draw() {
        fill("white");
        circle(this.x, this.y, 20);
    }
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    frameRate(fps)
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    for (let ball of balls) {
        ball.move();
        ball.draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    balls.push(new Ball(0, 0, mouseX - width / 2));
}

function rad(theta) {
    return Math.PI / 180 * theta;
}