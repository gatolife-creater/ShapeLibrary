let b = -100;
let bs = 1.5;

// let center = new Point(100, 100);
let center = Point.O();
let scope = 1;

// let p1 = new Point(100, 0);
// let p2 = new Point(100, 200);
// let p3 = new Point(300, -100);

// let p = new Point(300, 100);

// let l = new Line(
//     new Point(-100, -100),
//     new Point(0, -200)
// );

// let tri = new Triangle(p1, p2, p3);

// let rectangle = new Rectangle(
//     new Point(100, 0),
//     new Point(-200, 0),
//     new Point(-300, 200),
//     new Point(0, 200)
// );

let r = 10;

let polygon = new Polygon(
    [
        new Point(Math.cos(rad(0)) * r, Math.sin(rad(0)) * r),
        new Point(Math.cos(rad(72)) * r, Math.sin(rad(72)) * r),
        new Point(Math.cos(rad(144)) * r, Math.sin(rad(144)) * r),
        new Point(Math.cos(rad(216)) * r, Math.sin(rad(216)) * r),
        new Point(Math.cos(rad(288)) * r, Math.sin(rad(288)) * r),
    ]
);

let linear = new Linear("2x+300");

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(30);
    translate(width / 2, height / 2);

    // center = new Point(mouseX - width / 2, mouseY - height / 2);

    // let newP = p.magnify(center, scope);
    // let newL = l.magnify(center, scope);
    // let newTri = tri.magnify(center, scope);
    // let newRect = rectangle.magnify(center, scope);
    let polygons = [polygon];
    for (let i = 0; i < 10; i++) {
        polygons.push(polygons[i].magnify(center, scope));
    }

    // x軸、y軸の表示
    stroke("gray");
    line(-width / 2, 0, width / 2, 0);
    line(0, -height / 2, 0, height / 2);

    // noFill();
    // stroke("white");
    // strokeWeight(2);
    // triangle(newTri.p1.x, newTri.p1.y, newTri.p2.x, newTri.p2.y, newTri.p3.x, newTri.p3.y);

    // beginShape();
    // stroke("white");
    // strokeWeight(2);
    // vertex(newRect.p1.x, newRect.p1.y);
    // vertex(newRect.p2.x, newRect.p2.y);
    // vertex(newRect.p3.x, newRect.p3.y);
    // vertex(newRect.p4.x, newRect.p4.y);
    // endShape(CLOSE);


    for (let polygon of polygons) {
        beginShape();
        for (let p of polygon.points) {
            noFill();
            stroke("white");
            strokeWeight(2);
            vertex(p.x, p.y);
        }
        endShape(CLOSE);
    }


    // strokeWeight(5);
    // point(newP.x, newP.y);
    // strokeWeight(2);
    // line(newL.startPoint.x, newL.startPoint.y, newL.endPoint.x, newL.endPoint.y);

    fill("white");
    strokeWeight(1);
    textSize(20);
    text(scope.toFixed(1) + "倍", width / 2 - 300, -height / 2 + 100);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
    scope += event.deltaY / 5000 * scope;
}

function rad(theta) {
    return Math.PI / 180 * theta;
}