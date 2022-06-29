let r = 300;

let polygons;

let x = 50;
let xs = 1 / 8;
let m;
let n;

let apex = 3;

let count = 400;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    noFill();
    strokeWeight(1);
    stroke("white");

    x += xs;
    m = 100 - x;
    n = x;
    // m = 20;
    // n = 1;

    let points = [];

    for (let i = 0; i < apex; i++) {
        let point = new Point(cos(360 / apex * i) * r, sin(360 / apex * i) * r);
        points.push(point);
    }

    polygons = [
        new Polygon(points)
    ];

    if (x >= 99 || x <= 1) {
        xs *= -1;
    }


    for (let i = 0; i < count; i++) {
        let newPoints = [];
        for (let line of polygons[i].lines) {
            newPoints.push(line.getInteriorPoint(m, n));
        }
        let newRectangle = new Polygon(newPoints);
        polygons.push(newRectangle);
    }

    for (let i = 0; i < count; i++) {
        beginShape();
        for (let point of polygons[i].points) {
            vertex(point.x, point.y);
        }
        endShape(CLOSE);
    }

    // 二次関数の軸
    stroke(0, 255, 125);
    strokeWeight(1);

    // いろいろな点の表示
    stroke(255, 0, 0);
    strokeWeight(10);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
    r += event.deltaY * r / 1500;
    if (r === 0) {
        r === 1;
    }
}