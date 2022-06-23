var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * 2点間の距離を求める
     */
    Point.dist = function (p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) +
            Math.pow((p2.y - p1.y), 2));
    };
    Point.getMidpoint = function (p1, p2) {
        return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    };
    Point.getSymmetricPoint = function (p, center) {
        var x = center.x - p.x;
        var y = center.y - p.y;
        return new Point(center.x + y, center.y + x);
    };
    return Point;
}());
var point1 = new Point(10, 10);
var point2 = new Point(0, 0);
console.log(Point.getSymmetricPoint(point1, point2));
