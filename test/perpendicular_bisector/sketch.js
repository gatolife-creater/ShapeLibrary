let min = -400;
let max = 400;
let b = -100;
let bs = 1.5;

let r = 100;
let tmp;


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    let p1 = new Point(cos(0) * r, sin(0) * r);
    let p2 = new Point(mouseX - width / 2, mouseY - height / 2);
    let l = new Line(p1, p2);

    tmp = l.getPerpendicularBisector();

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

    stroke("white");
    strokeWeight(2);
    tmp.draw(min, max);

    push();
    stroke("red");
    strokeWeight(10);
    p1.draw();
    p2.draw();
    pop();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}