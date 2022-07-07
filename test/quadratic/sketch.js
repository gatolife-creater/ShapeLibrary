let r = 300;

let tri = new Triangle(
    new Point(250, 0),
    new Point(200, 200),
    new Point(350, 100)
);

let symmetricTri = tri.getSymmetricTriangle(Point.O());

let point1 = new Line(tri.p1, tri.p2).getInteriorPoint(3, 1);
let point2 = new Line(tri.p2, tri.p3).getInteriorPoint(3, 1);
let point3 = new Line(tri.p3, tri.p1).getInteriorPoint(3, 1);
let tri2 = new Triangle(point1, point2, point3);

console.log("triangle area:", tri.getArea());
console.log("triangle2 area:", tri2.getArea());

console.log(tri.getBarycenter(), tri2.getBarycenter());

let l = new Line(100, 150, 200, 100);

let a = "-0.01";
let Quadratic2 = new Quadratic(`${a}(x-20)^2+200`);

let p1 = -200;
let p1s = 1

let min = -300;
let max = 300;

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
    l.draw();
    tri.draw();
    tri2.draw();
    symmetricTri.draw();

    p1 += p1s;

    //二次関数宣言
    Quadratic2 = new Quadratic(`${a}(x+${p1})^2+200`);
    symmetricQuadratic = Quadratic2.getSymmetricQuadratic(Point.O());

    //二次関数の定義域
    if (Quadratic2.getVertex().x < min || max < Quadratic2.getVertex().x) p1s *= -1;

    // 二次関数のグラフ表示
    Quadratic2.draw(min, max);

    beginShape();
    stroke("gray");
    symmetricQuadratic.draw(min, max);


    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    // 変形する三角形
    let varTri = new Triangle(Quadratic2.getVertex(), tri.getBarycenter(), new Point(0, Quadratic2.getY(0)));
    varTri.draw();

    // 定義域の直線
    line(min, -height / 2, min, height / 2);
    line(max, -height / 2, max, height / 2);

    // 二次関数の軸
    stroke(0, 255, 125);
    strokeWeight(1);
    line(Quadratic2.getVertex().x, -height / 2, Quadratic2.getVertex().x, height / 2);

    // いろいろな点の表示
    stroke(255, 0, 0);
    strokeWeight(10);

    let yIntercept = Quadratic2.getYIntercept();
    yIntercept.draw();
    Quadratic2.getVertex().draw();

    tri.getBarycenter().draw();
    varTri.getBarycenter().draw();

    stroke("lightgray");
    strokeWeight(0.9);
    text("y切片", yIntercept.x, yIntercept.y - 10);
    text("重心", varTri.getBarycenter().x, varTri.getBarycenter().y - 10);
    text("頂点", Quadratic2.getVertex().x, Quadratic2.getVertex().y - 10);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}