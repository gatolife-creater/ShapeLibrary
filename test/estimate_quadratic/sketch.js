let min = -400;
let max = 400;
let b = -100;
let bs = 1.5;

let p1 = new Point(-100, 200);
let p2 = new Point(0, 200);
let p3 = new Point(200, 0);

let estimatedQuadratic = Quadratic.estimateQuadraticByThreePoints(p1, p2, p3);
console.log(estimatedQuadratic);

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    // 定義域の直線
    line(min, -height / 2, min, height / 2);
    line(max, -height / 2, max, height / 2);

    b += bs;
    if (b < -300 || 300 < b) {
        bs *= -1;
    }

    beginShape();
    for (let x = min; x < max; x++) {
        stroke("white");
        strokeWeight(2);
        noFill();
        let y = estimatedQuadratic.getY(x);
        vertex(x, y);
    }
    endShape();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}