let tri = new Triangle(
    new Point(200, 0),
    new Point(0, 100),
    new Point(150, 100)
);

let point1 = Point.getMidpoint(tri.p1, tri.p2);
let point2 = Point.getMidpoint(tri.p2, tri.p3);
let point3 = Point.getMidpoint(tri.p3, tri.p1);
let tri2 = new Triangle(point1, point2, point3);

let A = new Point(-100, 0);
let B = new Point(100, -100);
let C = new Point(-100, 200);
let D = new Point(100, 100);
let rectangle = new Rectangle(A, B, C, D);
console.log("rect area:", rectangle.getArea());

console.log(tri.getBarycenter(), tri2.getBarycenter());

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);
    noFill();
    stroke("white");
    triangle(tri.p1.x, tri.p1.y, tri.p2.x, tri.p2.y, tri.p3.x, tri.p3.y);
    triangle(tri2.p1.x, tri2.p1.y, tri2.p2.x, tri2.p2.y, tri2.p3.x, tri2.p3.y)
}