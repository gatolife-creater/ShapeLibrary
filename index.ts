class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static dist(p1: Point, p2: Point) {
        return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    }

    static getMidpoint(p1: Point, p2: Point) {
        return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    }

    static getSymmetricPoint(p: Point, center: Point) {
        let x = center.x - p.x;
        let y = center.y - p.y;
        return new Point(center.x + y, center.y + x);
    }

    static getBarycenter(p1: Point, p2: Point, p3: Point) {
        return new Point((p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3);
    }
}

class Triangle {
    p1: Point;
    p2: Point;
    p3: Point;
    constructor(p1:Point, p2:Point, p3:Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    getBarycenter() {
        return Point.getBarycenter(this.p1, this.p2, this.p3);
    }

    getArea() {
        return (
            (1 / 2) *
            Math.abs(
                (this.p1.x - this.p3.x) * (this.p2.y - this.p3.y) -
                (this.p2.x - this.p3.x) * (this.p1.y - this.p3.y)
            )
        );
    }
}

class Rectangle {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;

    constructor(p1:Point, p2:Point, p3:Point, p4:Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }

    getArea() {
        let triangle1 = new Triangle(this.p1, this.p2, this.p3);
        let triangle2 = new Triangle(this.p2, this.p3, this.p4);
        return triangle1.getArea() + triangle2.getArea();
    }
}

class Line {
    startPoint: Point;
    endPoint: Point;

    constructor(startX: number, startY: number, endX: number, endY: number) {
        this.startPoint = new Point(startX, startY);
        this.endPoint = new Point(endX, endY);
    }

    getMidpoint() {
        return Point.getMidpoint(this.startPoint, this.endPoint);
    }

    getLength() {
        return Point.dist(this.startPoint, this.endPoint);
    }
}
