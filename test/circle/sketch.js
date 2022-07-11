let cir = new Circle(0, 0, 100);
let scope = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);
    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    noFill();
    stroke("white");
    strokeWeight(2);
    cir.magnify(Point.O(), scope).draw();
}

function mouseWheel(event) {
    scope += event.deltaY / 5000 * scope;
}