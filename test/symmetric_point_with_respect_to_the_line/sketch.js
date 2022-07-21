// let l1 = new Line(
//     new Point(0, 0),
//     new Point(200, 200)
// );
let linear = new Linear("2x+100");
let linear2 = new Linear("-0.25x + -100");


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);
    stroke("white");
    strokeWeight(2);

    let p = new Point(mouseX - width / 2, mouseY - height / 2);
    linear.draw(-width / 2, width / 2);
    linear2.draw(-width / 2, width / 2);

    stroke("red");
    strokeWeight(10);
    p.draw();
    linear.getSymmetricPointToL(p).draw();
    linear2.getSymmetricPointToL(p).draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}