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

let quadraticFunction = new QuadraticFunction("2x^2  -20x + 0");
console.log(quadraticFunction.vertexForm);
console.log(quadraticFunction.standardForm);
console.log("Vertex:", quadraticFunction.getVertex());

let quadraticFunction2 = new QuadraticFunction("-0.1(x - 20)^2 + 200");
console.log(quadraticFunction2.vertexForm);
console.log(quadraticFunction2.standardForm);
console.log("Vertex2:", quadraticFunction2.getVertex());

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    noFill();
    strokeWeight(5);
    stroke("white");
    point(p.x, p.y);
    line(l.startPoint.x, l.startPoint.y, l.endPoint.x, l.endPoint.y);
    point(IP.x, IP.y);
    // line(line1.startPoint.x, line1.startPoint.y, line1.endPoint.x, line1.endPoint.y);
    triangle(tri.p1.x, tri.p1.y, tri.p2.x, tri.p2.y, tri.p3.x, tri.p3.y);
    triangle(tri2.p1.x, tri2.p1.y, tri2.p2.x, tri2.p2.y, tri2.p3.x, tri2.p3.y);

    for (let x = -100; x < 100; x++) {
        let y = quadraticFunction2.getY(x);
        point(x, y);
    }
}