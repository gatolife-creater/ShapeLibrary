let quadratic = new Quadratic("-0.01(x-100)^2+300");
let anotherQuadratic;

let min = -400;
let max = 400;
let scope = 1;

let slider;


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    slider = createSlider(-1000, 1000, 0, 1);
    slider.style("width", "80px");
    slider.position("top", "20px");
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

    strokeWeight(2);
    stroke("white");
    noFill();
    quadratic.magnify(Point.O(), scope).draw(min, max);
    quadratic.magnify(Point.O(), scope).getTangentLinear(slider.value() * scope).draw(min, max);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
    scope += event.deltaY / 5000 * scope;
}