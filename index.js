var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.dist = function (p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    };
    Point.getMidpoint = function (p1, p2) {
        return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    };
    Point.getSymmetricPoint = function (p, center) {
        var x = center.x - p.x;
        var y = center.y - p.y;
        return new Point(center.x + y, center.y + x);
    };
    Point.getBarycenter = function (p1, p2, p3) {
        return new Point((p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3);
    };
    return Point;
}());
var Triangle = /** @class */ (function () {
    function Triangle(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    Triangle.prototype.getBarycenter = function () {
        return Point.getBarycenter(this.p1, this.p2, this.p3);
    };
    Triangle.prototype.getArea = function () {
        return ((1 / 2) *
            Math.abs((this.p1.x - this.p3.x) * (this.p2.y - this.p3.y) -
                (this.p2.x - this.p3.x) * (this.p1.y - this.p3.y)));
    };
    return Triangle;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }
    Rectangle.prototype.getArea = function () {
        var triangle1 = new Triangle(this.p1, this.p2, this.p3);
        var triangle2 = new Triangle(this.p2, this.p3, this.p4);
        return triangle1.getArea() + triangle2.getArea();
    };
    return Rectangle;
}());
var Line = /** @class */ (function () {
    function Line(startX, startY, endX, endY) {
        this.startPoint = new Point(startX, startY);
        this.endPoint = new Point(endX, endY);
    }
    Line.prototype.getMidpoint = function () {
        return Point.getMidpoint(this.startPoint, this.endPoint);
    };
    Line.prototype.getLength = function () {
        return Point.dist(this.startPoint, this.endPoint);
    };
    return Line;
}());
