let linear = new Linear("-0.5x+0");
let quadratic = new Quadratic("-0.01(x-10)^2+200");
let min = -400;
let max = 400;
let a = -0.5;
let b = -100;
let bs = 1.5;
let points = quadratic.getIntersectionOfQuadraticAndLinear(linear);

let bSlider;


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    bSlider = createSlider(-300, 300, 0, 0.1);
    bSlider.style("width", "80px");
    bSlider.position("top", "20px");
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

    // a -= 0.01;
    b += bs;
    // b = bSlider.value();
    if (b < -300 || 300 < b) {
        bs *= -1;
    }
    linear = new Linear(`${a}x+${b}`);
    points = quadratic.getIntersectionOfQuadraticAndLinear(linear);

    beginShape();
    for (let x = min; x < max; x++) {
        stroke("white");
        let y = linear.getY(x);
        vertex(x, y);
    }
    endShape();

    beginShape();
    for (let x = min; x < max; x++) {
        stroke("white");
        noFill();
        let y = quadratic.getY(x);
        vertex(x, y);
    }
    endShape();

    push();
    for (let p of points) {
        stroke("red");
        strokeWeight(10);
        point(p.x, p.y);
    }
    pop();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}