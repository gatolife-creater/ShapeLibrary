let p = new Point(100, 100);
let l = new Line(
    new Point(-100, -300),
    new Point(-400, 300)
)


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    l = new Line(
        new Point(mouseX - width / 2, mouseY - height / 2),
        new Point(-400, 300)
    )

    let distance = l.getDistBetweenPoint(p);


    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    push();
    strokeWeight(2);
    stroke("white");
    l.draw();

    strokeWeight(5);
    p.draw();
    pop();

    noFill();
    circle(p.x, p.y, distance * 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}