let r = 300;

let triangles;

let x = 50;
let xs = 1 / 8;
let m, n;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    noFill();
    strokeWeight(2);
    stroke("white");

    x += xs;
    m = 100 - x;
    n = x;
    triangles = [
        new Triangle(
            new Point(cos(0) * r, sin(0) * r),
            new Point(cos(120) * r, sin(120) * r),
            new Point(cos(240) * r, sin(240) * r)
        )
    ];

    if (x <= 1 || 90 <= x) xs *= -1;

    for (let i = 0; i < 30; i++) {
        let newTriangle = new Triangle(
            triangles[i].l1.getInteriorPoint(m, n),
            triangles[i].l2.getInteriorPoint(m, n),
            triangles[i].l3.getInteriorPoint(m, n))
        triangles.push(newTriangle);
    }

    for (let tri of triangles) {
        tri.draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}