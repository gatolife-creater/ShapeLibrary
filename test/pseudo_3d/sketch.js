class Player {
    constructor(x, y, scope, accuracy, angle) {
        this.x = x;
        this.y = y;
        this.coor = new Point(x, y);
        this.scope = scope;
        this.angle = angle;
        this.leftAngle = this.angle - 150 / 2;
        this.rightAngle = this.angle + 150 / 2;
        this.lines = [];
        this.accuracy = accuracy;
        for (let i = -90; i < 90; i += 180 / this.accuracy) {
            this.lines.push(
                new Line(
                    new Point(this.x, this.y), new Point(this.x + cos(i + this.angle) * this.scope, this.y + sin(i + this.angle) * this.scope)
                )
            )
        }
    }
    update(x, y) {
        this.x = x;
        this.y = y;
        this.coor = new Point(x, y);
        this.lines = [];
        for (let i = 0; i < 150; i += 150 / this.accuracy) {
            this.lines.push(
                new Line(
                    new Point(this.x, this.y), new Point(this.x + cos(i + this.angle) * this.scope, this.y + sin(i + this.angle) * this.scope)
                )
            )
        }
    }

    draw() {
        push();
        stroke("white");
        strokeWeight(2);
        for (let l of this.lines) {
            line(l.startPoint.x, l.startPoint.y, l.endPoint.x, l.endPoint.y);
        }
        pop();
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.angle++;
            this.leftAngle = this.angle - this.scope / 2;
            this.rightAngle = this.angle + this.scope / 2;
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.angle--;
            this.leftAngle = this.angle - this.scope / 2;
            this.rightAngle = this.angle + this.scope / 2;
        }
        // w
        if (keyIsDown(87)) {
            let y = this.y - 1;
            this.update(this.x, y);
        }
    }

    wallView(wall) {
        let intersections = [];
        let distances = [];
        for (let l of this.lines) {
            let intersection = l.getIntersectionStrict(wall.l);
            intersections.push(intersection);
            distances.push(Point.dist(this.coor, intersection));
        }
        return { intersections, distances };
    }
}

class Wall {
    constructor(x1, y1, x2, y2) {
        this.p1 = new Point(x1, y1);
        this.p2 = new Point(x2, y2);
        this.l = new Line(this.p1, this.p2);
    }

    update(x1, y1, x2, y2) {
        this.p1 = new Point(x1, y1);
        this.p2 = new Point(x2, y2);
        this.l = new Line(this.p1, this.p2);
    }

    draw() {
        push();
        stroke("white");
        strokeWeight(2);
        line(this.l.startPoint.x, this.l.startPoint.y, this.l.endPoint.x, this.l.endPoint.y);
        pop();
    }
}

let player;
let rectangle;
let r = 200;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    player = new Player(0, 150, 200, 30, 0);
    rectangle = new Rectangle(
        new Point(cos(0) * r, sin(0) * r),
        new Point(cos(90) * r, sin(90) * r),
        new Point(cos(180) * r, sin(180) * r),
        new Point(cos(270) * r, sin(270) * r)
    );
}

function draw() {
    background(30);
    translate(width / 2, height / 2);
    player.draw();
    player.move();
    player.update(mouseX - width / 2, mouseY - height / 2);
    let lines = [
        rectangle.l1,
        rectangle.l2,
        rectangle.l3,
        rectangle.l4
    ];

    let walls = [];
    for (let line of lines) {
        walls.push(new Wall(
            line.startPoint.x,
            line.startPoint.y,
            line.endPoint.x,
            line.endPoint.y));
    }

    let infos = [];
    for (let wall of walls) {
        infos.push(player.wallView(wall));
    }

    stroke("red");
    strokeWeight(10);
    for (let info of infos) {
        let i = -1;
        for (let angle = player.leftAngle; angle < player.rightAngle - 0.01; angle += 150 / player.accuracy) {
            i++;
            let distance = info.distances[i];
            let wallPerDist = distance * cos(angle - player.angle);
            let h = constrain(2000 / wallPerDist, 0, 300);
            stroke("white");
            strokeWeight(5);
            line(i * 10 + width / 5, -h / 2 - height / 3, i * 10 + width / 5, h / 2 - height / 3);
        }

    }

    for (let wall of walls) {
        wall.draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}