let scope = 1;
let center = new Point3D(0, 0, 0);

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

let font;

function preload() {
    font = loadFont("https://themes.googleusercontent.com/static/fonts/kaushanscript/v1/qx1LSqts-NtiKcLw4N03IFhlQWQpSCpzb2Peu3I-Q34.woff");
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    background(30);
    stroke("white");
    debugMode();
    camera(500, -500, 500);

    lights();
    specularMaterial(250);


    push();
    stroke("black");
    strokeWeight(1);
    b.magnify(center, scope).draw();
    s.magnify(center, scope).draw();
    pop();


    push();
    stroke("white");
    l.magnify(center, scope).draw();
    tri.magnify(center, scope).draw();
    quad.magnify(center, scope).draw();
    strokeWeight(5);
    p.magnify(center, scope).draw();
    stroke("red");
    strokeWeight(10);
    tri.magnify(center, scope).getBarycenter().draw();
    pop();

    fill("white");
    strokeWeight(1);
    textSize(20);
    textFont(font);
    text("x " + scope.toFixed(1), width / 2 - 300, -height / 2 + 100);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
}

function mouseWheel(event) {
    scope += event.deltaY / 5000 * scope;
}