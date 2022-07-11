let min = -400;
let max = 400;
let b = -100;
let bs = 1.5;

// let center = new Point(100, 100);
let center = Point.O();
let scope = 1;

let p = new Point(300, 100);

let l = new Line(
    new Point(-100, -100),
    new Point(0, -200)
);

let tri = new Triangle(
    new Point(100, 0),
    new Point(100, 200),
    new Point(300, -100)
);

let quad = new Quad(
    new Point(100, 0),
    new Point(-200, 0),
    new Point(-300, 200),
    new Point(0, 200)
);

let r = 100;

let polygon = new Polygon(
    [
        new Point(Math.cos(rad(0)) * r, Math.sin(rad(0)) * r),
        new Point(Math.cos(rad(72)) * r, Math.sin(rad(72)) * r),
        new Point(Math.cos(rad(144)) * r, Math.sin(rad(144)) * r),
        new Point(Math.cos(rad(216)) * r, Math.sin(rad(216)) * r),
        new Point(Math.cos(rad(288)) * r, Math.sin(rad(288)) * r),
    ]
);

let linear = new Linear("2x+300");
let quadratic = new Quadratic("-0.01(x-200)^2+300");

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    // center = new Point(mouseX - width / 2, mouseY - height / 2);

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
    linear.magnify(center, scope).draw(min, max);
    quadratic.magnify(center, scope).draw(min, max);
    tri.magnify(center, scope).draw();
    quad.magnify(center, scope).draw();
    polygon.magnify(center, scope).draw();
    l.magnify(center, scope).draw();
    strokeWeight(5);
    p.magnify(center, scope).draw();

    fill("white");
    strokeWeight(1);
    textSize(20);
    text("x " + scope.toFixed(1), width / 2 - 300, -height / 2 + 100);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
    scope += event.deltaY / 5000 * scope;
}

function rad(theta) {
    return Math.PI / 180 * theta;
}