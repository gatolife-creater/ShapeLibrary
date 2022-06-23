class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * 2点間の距離を求める
     */
    static dist(p1: Point, p2: Point) {
        return Math.sqrt(
            (p2.x - p1.x) ** 2 +
            (p2.y - p1.y) ** 2
        );
    }

    static getMidpoint(p1: Point, p2: Point) {
        return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    }

    static getSymmetricPoint(p: Point, center: Point) {
        let x = center.x - p.x;
        let y = center.y - p.y;
        return new Point(center.x + y, center.y + x);
    }
}

let point1 = new Point(10, 10);
let point2 = new Point(0, 0);

console.log(Point.getSymmetricPoint(point1, point2));