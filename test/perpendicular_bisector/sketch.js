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
    // let p3 = new Point(cos(240) * r, sin(240) * r);
    let l = new Line(p1, p2);

    tmp = l.getPerpendicularBisector();
    // let orthocenter = Point.getOrthocenter(p1, p2, p3);

    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    // 定義域の直線
    line(min, -height / 2, min, height / 2);
    line(max, -height / 2, max, height / 2);

    // a -= 0.01;
    b += bs;
    // b = bSlider.value();
    if (b < -300 || 300 < b) {
        bs *= -1;
    }

    beginShape();
    for (let i = min; i < max; i++) {
        stroke("white");
        strokeWeight(2);
        let x = i;
        let y = tmp.getY(x);
        vertex(x, y);
    }
    endShape();

    push();
    stroke("red");
    strokeWeight(10);
    point(p1.x, p1.y);
    point(p2.x, p2.y);
    // point(p3.x, p3.y);
    stroke("green");
    // point(orthocenter.x, orthocenter.y);
    pop();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}