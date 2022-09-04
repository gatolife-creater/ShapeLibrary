let l = new Linear("2x+0");
let c = new Circle(0, 0, 200);

let aSlider;
let bSlider;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    aSlider = createSlider(-10, 10, 0, 0.1);
    bSlider = createSlider(-windowWidth, windowWidth, 0, 0.1);
    aSlider.position(100, 50);
    bSlider.position(100, 100);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);
    stroke("white");
    strokeWeight(2);
    noFill();
    l = new Linear(`${aSlider.value()}x+${bSlider.value()}`);
    l.draw(-width / 2, width / 2);
    c.draw();

    const points = c.getIntersectionsOfCL(l);

    for (const point of points) {
        stroke("red");
        strokeWeight(15);
        point.draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}