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
    let p3 = new Point(cos(240) * r, sin(240) * r);

    let tri = new Triangle(p1, p2, p3);

    let orthocenter = tri.getOrthocenter();
    let circumcenter = tri.getCircumcenter();
    let barycenter = tri.getBarycenter();
    let innerCenter = tri.getInnerCenter();
    let excenters = tri.getExcenters();


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

    push();

    stroke("red")
    strokeWeight(10);
    p1.draw();
    p2.draw();
    p3.draw();

    noStroke();
    fill("white");
    text("垂心", orthocenter.x - 10, orthocenter.y - 10);

    stroke("red")
    strokeWeight(10);
    orthocenter.draw();

    noStroke();
    fill("white");
    text("外心", circumcenter.x - 10, circumcenter.y - 10)

    stroke("red")
    strokeWeight(10);
    circumcenter.draw();

    noStroke();
    fill("white");
    text("重心", barycenter.x - 10, barycenter.y - 10);

    stroke("red")
    strokeWeight(10);
    barycenter.draw();

    stroke("red")
    strokeWeight(10);
    innerCenter.draw();

    noStroke();
    fill("white");
    text("内心", innerCenter.x - 10, innerCenter.y - 10);

    stroke("red")
    strokeWeight(10);
    innerCenter.draw();

    for (let excenter of excenters) {
        noStroke();
        fill("white");
        text("傍心", excenter.x - 10, excenter.y - 10);

        stroke("red")
        strokeWeight(10);
        excenter.draw();
    }

    pop();

    noFill();
    stroke("white");
    strokeWeight(2);
    triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

    stroke("gray");
    tri.getCircumscribedCircle().draw();
    tri.getInscribedCircle().draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}