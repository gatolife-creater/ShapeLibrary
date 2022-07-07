let r = 300;

let quads;

let x = 50;
let xs = 1 / 8;
let m;
let n;

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
    quads = [
        new Quad(
            new Point(cos(0) * r, sin(0) * r),
            new Point(cos(90) * r, sin(90) * r),
            new Point(cos(180) * r, sin(180) * r),
            new Point(cos(270) * r, sin(270) * r)
        )

    ];

    if (x >= 99 || x <= 1) {
        xs *= -1;
    }

    for (let i = 0; i < 30; i++) {
        let newQuad = new Quad(
            quads[i].l1.getInteriorPoint(m, n),
            quads[i].l2.getInteriorPoint(m, n),
            quads[i].l3.getInteriorPoint(m, n),
            quads[i].l4.getInteriorPoint(m, n))
        quads.push(newQuad);
    }

    for (let quad of quads) {
        quad.draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}