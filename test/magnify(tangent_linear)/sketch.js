let quadratic = new Quadratic("-0.01(x-100)^2+300");
let anotherQuadratic;

let min = -400;
let max = 400;
let a = -0.5;
let b = -100;
let bs = 1.5;
let scope = 1;


let tangentLinear;
let bSlider;


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    bSlider = createSlider(-1000, 1000, 0, 1);
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

    anotherQuadratic = quadratic.magnify(Point.O(), scope);

    b += bs;
    if (b < -300 || 300 < b) {
        bs *= -1;
    }
    tangentLinear = anotherQuadratic.getTangentLinear(bSlider.value() * scope);

    beginShape();
    for (let x = min; x < max; x++) {
        stroke("white");
        strokeWeight(2);
        let y = tangentLinear.getY(x);
        vertex(x, y);
    }
    endShape();

    beginShape();
    for (let x = min; x < max; x++) {
        stroke("white");
        strokeWeight(2);
        noFill();
        let y = anotherQuadratic.getY(x);
        vertex(x, y);
    }
    endShape();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
    scope += event.deltaY / 5000 * scope;
}