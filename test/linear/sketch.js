let linear = new Linear("-0.5x+0");
let quadratic = new Quadratic("-0.01(x-100)^2+300");
let anotherQuadratic = new Quadratic("-0.01(x-100)^2+100");
let min = -400;
let max = 400;
let a = -0.5;
let b = -100;
let bs = 1.5;
let points = quadratic.getIntersectionsOfQL(linear);
let quadraticPoints = quadratic.getIntersectionsOfQQ(anotherQuadratic);
console.log(quadraticPoints);

let tangentLinear;
let bSlider;

let results = quadratic.getSolution();


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    bSlider = createSlider(-300, 300, 0, 1);
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

    b += bs;
    if (b < -300 || 300 < b) {
        bs *= -1;
    }
    tangentLinear = quadratic.getTangentLinear(bSlider.value());

    linear = new Linear(`${a}x+${b}`);
    points = quadratic.getIntersectionsOfQL(linear);

    let intersection = linear.getIntersection(tangentLinear);

    noFill();
    stroke("white");
    strokeWeight(2);
    linear.draw(min, max);
    tangentLinear.draw(min, max);
    quadratic.draw(min, max);

    push();
    stroke("red");
    strokeWeight(10);
    intersection.draw();
    for (let p of points) {
        stroke("red");
        strokeWeight(10);
        p.draw();
    }

    for (let result of results) {
        result.draw();
    }
    pop();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}