let tri = new Triangle(
    new Point(200, 0),
    new Point(0, 100),
    new Point(150, 100)
);

let point1 = new Line(tri.p1, tri.p2).getInteriorPoint(3, 1);
let point2 = new Line(tri.p2, tri.p3).getInteriorPoint(3, 1);
let point3 = new Line(tri.p3, tri.p1).getInteriorPoint(3, 1);
let tri2 = new Triangle(point1, point2, point3);

console.log("triangle area:", tri.getArea());
console.log("triangle2 area:", tri2.getArea());

// console.log("triangle:", tri.getAroundLength());
// console.log("triangle2:", tri2.getAroundLength());

let A = new Point(-100, 0);
let B = new Point(100, -100);
let C = new Point(-100, 200);
let D = new Point(100, 100);
let rectangle = new Rectangle(A, B, C, D);
// console.log("rect area:", rectangle.getArea());
// console.log("rect length:", rectangle.getAroundLength());

console.log(tri.getBarycenter(), tri2.getBarycenter());

let p = Point.O();
let l = new Line(100, 150, 200, 100);

let IP = l.getExteriorPoint(1, 5);
// let IP = l.getInteriorPoint(3, 2);

// let line1 = new Line(0, 0, 0, l.getDistBetweenPoint(p));
// console.log('dist:', l.getDistBetweenPoint(p));

// let quadraticFunction = new QuadraticFunction("2x^2  -20x + 0");
// console.log(quadraticFunction.vertexForm);
// console.log(quadraticFunction.standardForm);
// console.log("Vertex:", quadraticFunction.getVertex());

let a = "-0.01";
let quadraticFunction2 = new QuadraticFunction(`${a}(x - 20)^2 + 200`);

let p1 = -200;
let p1s = 1

let min = -250;
let max = 250;

let triangles = [];

for (let i = 0; i < 5; i++) {
    let triangle = new Triangle()
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    noFill();
    strokeWeight(2);
    stroke("white");
    point(p.x, p.y);
    line(l.startPoint.x, l.startPoint.y, l.endPoint.x, l.endPoint.y);
    point(IP.x, IP.y);
    // line(line1.startPoint.x, line1.startPoint.y, line1.endPoint.x, line1.endPoint.y);
    triangle(tri.p1.x, tri.p1.y, tri.p2.x, tri.p2.y, tri.p3.x, tri.p3.y);
    triangle(tri2.p1.x, tri2.p1.y, tri2.p2.x, tri2.p2.y, tri2.p3.x, tri2.p3.y);

    p1 += p1s;

    //二次関数宣言
    quadraticFunction2 = new QuadraticFunction(`${a}(x +${p1})^2 + 200`);

    //二次関数の定義域
    if (quadraticFunction2.getVertex().x < min || max < quadraticFunction2.getVertex().x) p1s *= -1;

    // 二次関数のグラフ表示
    beginShape();
    for (let x = min; x < max; x++) {
        let y = quadraticFunction2.getY(x);
        vertex(x, y);
    }
    endShape();

    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    // 変形する三角形
    let varTri = new Triangle(quadraticFunction2.getVertex(), tri.getBarycenter(), new Point(0, quadraticFunction2.getY(0)));
    triangle(varTri.p1.x, varTri.p1.y, varTri.p2.x, varTri.p2.y, varTri.p3.x, varTri.p3.y)

    // 定義域の直線
    // stroke("white");
    line(min, -height / 2, min, height / 2);
    line(max, -height / 2, max, height / 2);

    // 二次関数の軸
    stroke(0, 255, 125);
    strokeWeight(1);
    line(quadraticFunction2.getVertex().x, -height / 2, quadraticFunction2.getVertex().x, height / 2);

    // いろいろな点の表示
    stroke(255, 0, 0);
    strokeWeight(10);

    let yIntercept = quadraticFunction2.getYIntercept();
    point(yIntercept.x, yIntercept.y);
    point(quadraticFunction2.getVertex().x, quadraticFunction2.getVertex().y);

    point(tri.getBarycenter().x, tri.getBarycenter().y);
    point(varTri.getBarycenter().x, varTri.getBarycenter().y);

    stroke("lightgray");
    strokeWeight(0.9);
    text("y切片", yIntercept.x, yIntercept.y - 10);
    text("重心", varTri.getBarycenter().x, varTri.getBarycenter().y - 10);
    text("頂点", quadraticFunction2.getVertex().x, quadraticFunction2.getVertex().y - 10);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}