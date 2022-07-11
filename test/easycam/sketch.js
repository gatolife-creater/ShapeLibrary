let b = new Box(0, 0, 0, 100, 100, 100);
let quadratic = new Quadratic("-0.01(x-100)^2+300");

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    createEasyCam(); // p5.EasyCam's function
}

function draw() {
    background(30);
    debugMode();


    lights();
    b.draw();

    push();
    noFill();
    stroke("white");
    strokeWeight(2);
    quadratic.draw(-1000, 1000);
    pop();
}