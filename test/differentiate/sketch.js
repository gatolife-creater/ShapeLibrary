let quadratic = new Quadratic("-0.01(x-100)^2+300");
let min = -400;
let max = 400;

function setup() {
    createCanvas(windowWidth, windowHeight);
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

    noFill();
    stroke("white");
    strokeWeight(2);
    quadratic.draw(min, max);
    quadratic.differentiate().draw(min, max);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}