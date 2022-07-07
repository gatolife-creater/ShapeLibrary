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
    l1.draw();
    l2.draw();

    stroke("red");
    strokeWeight(15);
    let p1 = l1.getIntersection(l2);
    p1.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}