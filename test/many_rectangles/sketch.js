let r = 300;

let rectangles;

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
    rectangles = [
        new Rectangle(
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
        let newRectangle = new Rectangle(
            rectangles[i].l1.getInteriorPoint(m, n),
            rectangles[i].l2.getInteriorPoint(m, n),
            rectangles[i].l3.getInteriorPoint(m, n),
            rectangles[i].l4.getInteriorPoint(m, n))
        rectangles.push(newRectangle);
    }

    for (let i = 0; i < 30; i++) {
        beginShape();
        vertex(rectangles[i].p1.x, rectangles[i].p1.y);
        vertex(rectangles[i].p2.x, rectangles[i].p2.y);
        vertex(rectangles[i].p3.x, rectangles[i].p3.y);
        vertex(rectangles[i].p4.x, rectangles[i].p4.y);
        endShape(CLOSE);
        // triangle(
        //     rectangles[i].p1.x,
        //     rectangles[i].p1.y,
        //     rectangles[i].p2.x,
        //     rectangles[i].p2.y,
        //     rectangles[i].p3.x,
        //     rectangles[i].p3.y
        // );
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