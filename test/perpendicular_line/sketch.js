let min = -600;
let max = 600;
let b = -100;
let bs = 1.5;

let aSlider;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    aSlider = createSlider(-10, 10, 0, 0.1);
    aSlider.position(100, 100);
    aSlider.style("width", "100px");
}

function draw() {
    background(30);
    translate(width / 2, height / 2);


    let linear = new Linear(`${aSlider.value()}x+100`);
    let perpendicularLinear = linear.getPerpendicularLinear(new Point(mouseX - width / 2, mouseY - height / 2));


    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    // 定義域の直線
    line(min, -height / 2, min, height / 2);
    line(max, -height / 2, max, height / 2);

    // a -= 0.01;
    b += bs;
    // b = bSlider.value();
    if (b < -300 || 300 < b) {
        bs *= -1;
    }

    beginShape();
    for (let i = min; i < max; i++) {
        stroke("white");
        strokeWeight(2);
        let x = i;
        let y = linear.getY(x);
        vertex(x, y);
    }
    endShape();

    beginShape();
    for (let i = min; i < max; i++) {
        stroke("white");
        strokeWeight(2);
        let x = i;
        let y = perpendicularLinear.getY(x);
        vertex(x, y);
    }
    endShape();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}