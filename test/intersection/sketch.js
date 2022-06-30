let l1 = new Line(
    new Point(0, 0),
    new Point(200, 200)
);

let l2 = new Line(
    new Point(0, 200),
    new Point(200, 0)
);

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);
    stroke("white");
    strokeWeight(2);
    line(l1.startPoint.x, l1.startPoint.y, l1.endPoint.x, l1.endPoint.y);
    line(l2.startPoint.x, l2.startPoint.y, l2.endPoint.x, l2.endPoint.y);

    stroke("red");
    strokeWeight(15);
    let p1 = l1.getIntersection(l2);
    point(p1.x, p1.y);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}