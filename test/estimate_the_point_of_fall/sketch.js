let min = -400;
let max = 400;
let b = -100;
let bs = 1.5;

const g = 9.8 / 10;
const V0 = -30;
const theta = 150;
let x;
let y;
let t = 0;

let points = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(30);
    translate(width / 2, height);

    t++;

    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    // 定義域の直線
    line(min, -height / 2, min, height / 2);
    line(max, -height / 2, max, height / 2);

    // a -= 0.01;
    b += bs;
    // b = bSlider.value();
    if (b < -300 || 300 < b) {
        bs *= -1;
    }

    Vx = V0 * cos(theta);
    Vy = V0 * sin(theta);
    x = Vx * t;
    y = Vy * t + (1 / 2 * g * t ** 2);
    fill("white");
    circle(x, y, 30);

    if (points.length < 3) {
        points.push(new Point(x, y));
    } else if (points.length >= 3) {
        estimatedQuadratic = Quadratic.estimateQuadraticByThreePoints(points[0], points[1], points[2]);
        fallingPoint = estimatedQuadratic.getSolution()[0];
        passingPoint = estimatedQuadratic.getIntersectionsOfQL(new Linear("0x-100"))[0];
        push();
        stroke("red");
        strokeWeight(15);
        point(fallingPoint.x, fallingPoint.y);
        point(passingPoint.x, passingPoint.y);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}