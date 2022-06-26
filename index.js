var Manager = /** @class */ (function () {
    function Manager() {
    }
    Manager.displayError = function (conditions) {
        var message = "ConditionalError: You must follow the following rules:";
        for (var _i = 0, conditions_1 = conditions; _i < conditions_1.length; _i++) {
            var condition = conditions_1[_i];
            message += "\n\t".concat(condition);
        }
        throw message;
    };
    return Manager;
}());
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
var Line = /** @class */ (function () {
    function Line(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
    Line.prototype.getMidpoint = function () {
        return Point.getMidpoint(this.startPoint, this.endPoint);
    };
    Line.prototype.getInteriorPoint = function (m, n) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        }
        else {
            return new Point((this.startPoint.x * n + this.endPoint.x * m) / (m + n), (this.startPoint.y * n + this.endPoint.y * m) / (m + n));
        }
    };
    Line.prototype.getExteriorPoint = function (m, n) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        }
        else {
            return new Point((-this.startPoint.x * n + this.endPoint.x * m) / (m - n), (-this.startPoint.y * n + this.endPoint.y * m) / (m - n));
        }
    };
    Line.prototype.getLength = function () {
        return Point.dist(this.startPoint, this.endPoint);
    };
    Line.prototype.getDistBetweenPoint = function (p) {
        var a = (this.endPoint.y - this.startPoint.y) /
            (this.endPoint.x - this.startPoint.x);
        var b = -1;
        var c = this.startPoint.y + a * this.startPoint.x;
        return Math.abs(a * p.x + b + p.y + c) / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    };
    return Line;
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
    Triangle.prototype.getAroundLength = function () {
        var p1 = new Line(this.p1, this.p2);
        var p2 = new Line(this.p2, this.p3);
        var p3 = new Line(this.p3, this.p1);
        return p1.getLength() + p2.getLength() + p3.getLength();
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
    Rectangle.prototype.getAroundLength = function () {
        var l1 = new Line(this.p1, this.p2);
        var l2 = new Line(this.p2, this.p3);
        var l3 = new Line(this.p3, this.p4);
        var l4 = new Line(this.p4, this.p1);
        return l1.getLength() + l2.getLength() + l3.getLength() + l4.getLength();
    };
    return Rectangle;
}());
var QuadraticFunction = /** @class */ (function () {
    /**
     * x^2, xの係数, 定数項が0, 1であっても入力すること
     * @param formula
     */
    function QuadraticFunction(formula) {
        this.setForms(formula);
        this.a;
        this.b;
        this.c;
        this.p;
        this.q;
        this.vertexForm;
        this.standardForm;
    }
    QuadraticFunction.prototype.judgeForm = function (formula) {
        return "vertex";
    };
    QuadraticFunction.prototype.setForms = function (formula) {
        if (this.judgeForm(formula) === "vertex") {
            var array = formula.replace(/\s/g, "").split(/\+|x\^2|x/).filter(function (v) { return v; });
            this.a = Number(array[0]);
            this.b = Number(array[1]);
            this.c = Number(array[2]);
            var stringA = String(this.a);
            var stringB = this.b >= 0 ? "+" + String(this.b) : String(this.b);
            var stringC = this.c >= 0 ? "+" + String(this.c) : String(this.c);
            this.vertexForm = "".concat(stringA, "x^2").concat(stringB, "x").concat(stringC);
            this.p = -this.b / 2 * this.a;
            this.q = -(Math.pow(this.b, 2) - 4 * this.a * this.c) / 4 * this.a;
            var stringP = this.p * (-1) >= 0 ? "+" + String(this.p * (-1)) : String(this.p * (-1));
            var stringQ = this.q >= 0 ? "+" + String(this.q) : String(this.q);
            this.standardForm = "".concat(stringA, "(x").concat(stringP, ")^2").concat(stringQ);
        }
        else if (this.judgeForm(formula) === "standard") {
        }
    };
    QuadraticFunction.prototype.getVertex = function () {
        return new Point(this.p, this.q);
    };
    return QuadraticFunction;
}());
