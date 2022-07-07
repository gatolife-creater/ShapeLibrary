let quadratic = new Quadratic("-0.01(x-100)^2+300");
let anotherQuadratic = new Quadratic("0.01(x-150)^2+0");

let min = -400;
let max = 400;
let b = -100;
let bs = 1.5;
let quadraticPoints = quadratic.getIntersectionsOfQQ(anotherQuadratic);

let aSlider;
let cSlider;
let bSlider;


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    aSlider = createSlider(-0.05, 0.05, 0, 0.0001);
    aSlider.style("width", "80px");
    aSlider.position(100, 50);

    bSlider = createSlider(-300, 300, 0, 1);
    bSlider.style("width", "80px");
    bSlider.position(100, 100);

    cSlider = createSlider(-300, 300, 0, 1);
    cSlider.style("width", "80px");
    cSlider.position(100, 150);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    anotherQuadratic = new Quadratic(`${aSlider.value()}(x+${bSlider.value()})^2+${cSlider.value()}`);
    quadraticPoints = quadratic.getIntersectionsOfQQ(anotherQuadratic);

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

    noFill();
    stroke("white");
    strokeWeight(2);
    quadratic.draw(min, max);
    anotherQuadratic.draw();

    push();
    stroke("red");
    strokeWeight(10);

    for (let p of quadraticPoints) {
        p.draw();
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}