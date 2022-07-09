let b = new Box(100, 0, 200, 100, 100, 100);
let s = new Sphere(0, 0, 0, 100);
let p = new Point3D(200, -200, -200);
let l = new Line3D(
    new Point3D(-200, -200, -100),
    new Point3D(-200, 0, 200),
);
let tri = new Triangle3D(
    new Point3D(-200, -200, -200),
    new Point3D(-200, 0, 0),
    new Point3D(-200, 0, -200),
);
let quad = new Quad3D(
    new Point3D(200, 0, -200),
    new Point3D(0, 0, -200),
    new Point3D(-100, -200, -200),
    new Point3D(100, -200, -200),
);



function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    background(30);
    orbitControl(2, 2, 2);
    debugMode();

    lights();
    specularMaterial(250);


    push();
    stroke("black");
    strokeWeight(1);
    b.draw();
    s.draw();
    pop();


    push();
    stroke("white");
    l.draw();
    tri.draw();
    quad.draw();
    strokeWeight(5);
    p.draw();
    stroke("red");
    strokeWeight(10);
    tri.getBarycenter().draw();
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
}