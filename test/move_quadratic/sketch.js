let a = "-0.01";
let quadratic = new Quadratic(`${a}(x-0)^2+100`);

let p1 = 0;

let min = -300;
let max = 300;

let movedQuadratic = quadratic.moveQuadratic(100, 200);

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

    //二次関数の定義域
    if (quadratic.getVertex().x < min || max < quadratic.getVertex().x) p1s *= -1;

    // 二次関数のグラフ表示
    stroke("gray");
    quadratic.draw(min, max);

    stroke("white");
    movedQuadratic.draw(min, max);

    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    // 定義域の直線
    line(min, -height / 2, min, height / 2);
    line(max, -height / 2, max, height / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}