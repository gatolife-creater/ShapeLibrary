class Manager {
    static displayError(conditions: string[]) {
        let message = `ConditionalError: You must follow the following rules:`;
        for (let condition of conditions) {
            message += `\n\t${condition}`;
        }
        throw message;
    }
}

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
    constructor(p1: Point, p2: Point, p3: Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    getBarycenter() {
        return Point.getBarycenter(this.p1, this.p2, this.p3);
    }

    getAroundLength() {
        let p1 = new Line(this.p1, this.p2);
        let p2 = new Line(this.p2, this.p3);
        let p3 = new Line(this.p3, this.p1);
        return p1.getLength() + p2.getLength() + p3.getLength();
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

    constructor(p1: Point, p2: Point, p3: Point, p4: Point) {
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

    getAroundLength() {
        let l1 = new Line(this.p1, this.p2);
        let l2 = new Line(this.p2, this.p3);
        let l3 = new Line(this.p3, this.p4);
        let l4 = new Line(this.p4, this.p1);
        return l1.getLength() + l2.getLength() + l3.getLength() + l4.getLength();
    }
    /* 対角線の交点を調べたい */
}

class Line {
    startPoint: Point;
    endPoint: Point;

    constructor(startPoint: Point, endPoint: Point) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    getMidpoint() {
        return Point.getMidpoint(this.startPoint, this.endPoint);
    }

    getInteriorPoint(m: number, n: number) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        } else {
            return new Point(
                (this.startPoint.x * n + this.endPoint.x * m) / (m + n),
                (this.startPoint.y * n + this.endPoint.y * m) / (m + n)
            );
        }
    }

    getExteriorPoint(m: number, n: number) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        } else {
            return new Point(
                (-this.startPoint.x * n + this.endPoint.x * m) / (m - n),
                (-this.startPoint.y * n + this.endPoint.y * m) / (m - n)
            );
        }
    }

    getLength() {
        return Point.dist(this.startPoint, this.endPoint);
    }

    getDistBetweenPoint(p: Point) {
        let a =
            (this.endPoint.y - this.startPoint.y) /
            (this.endPoint.x - this.startPoint.x);
        let b = -1;
        let c = this.startPoint.y + a * this.startPoint.x;
        return Math.abs(a * p.x + b + p.y + c) / Math.sqrt(a ** 2 + b ** 2);
    }
}