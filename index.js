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
    /**
     * 2点間の距離を求める
     * */
    Point.dist = function (p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    };
    /**
     * 中点を求める
     *  */
    Point.getMidpoint = function (p1, p2) {
        return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    };
    /**
     * 特定の点に対して対称な点を求める
     * */
    Point.getSymmetricPoint = function (p, center) {
        var x = center.x - p.x;
        var y = center.y - p.y;
        return new Point(center.x + x, center.y + y);
    };
    /**
     * 3点間の重心を求める
     * */
    Point.getBarycenter = function (p1, p2, p3) {
        return new Point((p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3);
    };
    Point.getCircumcenter = function (p1, p2, p3) {
        var l1 = new Line(p1, p2);
        var l2 = new Line(p2, p3);
        // let l3 = new Line(p3, p1);
        var perpendicularBisector1 = l1.getPerpendicularBisector();
        var perpendicularBisector2 = l2.getPerpendicularBisector();
        return perpendicularBisector1.getIntersection(perpendicularBisector2);
    };
    Point.getOrthocenter = function (p1, p2, p3) {
        var x1 = p1.x;
        var y1 = p1.y;
        var x2 = p2.x;
        var y2 = p2.y;
        var x3 = p3.x;
        var y3 = p3.y;
        var l1 = new Linear("".concat((y2 - y1) / (x2 - x1), "x+").concat(-((y2 - y1) / (x2 - x1)) + y1));
        var l2 = new Linear("".concat((y3 - y2) / (x3 - x2), "x+").concat(-((y3 - y2) / (x3 - x2)) + y2));
        var perpendicularLinear1 = l1.getPerpendicularLinear(p3);
        var perpendicularLinear2 = l2.getPerpendicularLinear(p1);
        return perpendicularLinear1.getIntersection(perpendicularLinear2);
    };
    /**
     * 原点を求める
     *  */
    Point.O = function () {
        return new Point(0, 0);
    };
    return Point;
}());
var Line = /** @class */ (function () {
    function Line(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
    /**
     * 線分を二分する点を求める
     *  */
    Line.prototype.getMidpoint = function () {
        return Point.getMidpoint(this.startPoint, this.endPoint);
    };
    /**
     * 内分点を求める
     *  */
    Line.prototype.getInteriorPoint = function (m, n) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        }
        else {
            return new Point((this.startPoint.x * n + this.endPoint.x * m) / (m + n), (this.startPoint.y * n + this.endPoint.y * m) / (m + n));
        }
    };
    /**
     * 外分点を求める
     *  */
    Line.prototype.getExteriorPoint = function (m, n) {
        if (m <= 0 || n <= 0) {
            return Manager.displayError(["m > 0", "n > 0"]);
        }
        else {
            return new Point((-this.startPoint.x * n + this.endPoint.x * m) / (m - n), (-this.startPoint.y * n + this.endPoint.y * m) / (m - n));
        }
    };
    /**
     * 線の長さを求める
     *  */
    Line.prototype.getLength = function () {
        return Point.dist(this.startPoint, this.endPoint);
    };
    /**
     * 点と直線の距離を求める
     *  */
    Line.prototype.getDistBetweenPoint = function (p) {
        var a = (this.endPoint.y - this.startPoint.y) /
            (this.endPoint.x - this.startPoint.x);
        var b = -1;
        var c = this.startPoint.y - a * this.startPoint.x;
        return Math.abs(a * p.x + b + p.y + c) / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    };
    Line.prototype.getIntersection = function (l) {
        var a = (l.endPoint.y - l.startPoint.y) / (l.endPoint.x - l.startPoint.x);
        var b = l.startPoint.y - (l.endPoint.y - l.startPoint.y) / (l.endPoint.x - l.startPoint.x) * l.startPoint.x;
        var c = (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x);
        var d = this.startPoint.y - (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x) * this.startPoint.x;
        return new Point((d - b) / (a - c), a * (d - b) / (a - c) + b);
    };
    Line.prototype.getPerpendicularBisector = function () {
        var x1 = this.startPoint.x;
        var y1 = this.startPoint.y;
        var x2 = this.endPoint.x;
        var y2 = this.endPoint.y;
        var linear = new Linear("".concat((y2 - y1) / (x2 - x1), "x+").concat((-(y2 - y1) / (x2 - x1) * x1) + y1));
        return linear.getPerpendicularLinear(this.getMidpoint());
        // 戻り値が関数ってやばくね？
    };
    return Line;
}());
var Triangle = /** @class */ (function () {
    function Triangle(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.l1 = new Line(this.p1, this.p2);
        this.l2 = new Line(this.p2, this.p3);
        this.l3 = new Line(this.p3, this.p1);
    }
    /**
     * 三角形の重心を求める
     *  */
    Triangle.prototype.getBarycenter = function () {
        return Point.getBarycenter(this.p1, this.p2, this.p3);
    };
    Triangle.prototype.getCircumcenter = function () {
        return Point.getCircumcenter(this.p1, this.p2, this.p3);
    };
    Triangle.prototype.getOrthocenter = function () {
        return Point.getOrthocenter(this.p1, this.p2, this.p3);
    };
    /**
     * 辺の長さの和を求める
     *  */
    Triangle.prototype.getAroundLength = function () {
        var p1 = new Line(this.p1, this.p2);
        var p2 = new Line(this.p2, this.p3);
        var p3 = new Line(this.p3, this.p1);
        return p1.getLength() + p2.getLength() + p3.getLength();
    };
    /**
     * 三角形の面積を求める
     *  */
    Triangle.prototype.getArea = function () {
        return ((1 / 2) *
            Math.abs((this.p1.x - this.p3.x) * (this.p2.y - this.p3.y) -
                (this.p2.x - this.p3.x) * (this.p1.y - this.p3.y)));
    };
    Triangle.prototype.getSymmetricTriangle = function (center) {
        return new Triangle(Point.getSymmetricPoint(this.p1, center), Point.getSymmetricPoint(this.p2, center), Point.getSymmetricPoint(this.p3, center));
    };
    return Triangle;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.l1 = new Line(this.p1, this.p2);
        this.l2 = new Line(this.p2, this.p3);
        this.l3 = new Line(this.p3, this.p4);
        this.l4 = new Line(this.p4, this.p1);
    }
    /**
     * 四角形の面積を求める
     *  */
    Rectangle.prototype.getArea = function () {
        var triangle1 = new Triangle(this.p1, this.p2, this.p3);
        var triangle2 = new Triangle(this.p2, this.p3, this.p4);
        return triangle1.getArea() + triangle2.getArea();
    };
    /**
     * 辺の長さの和を求める
     *  */
    Rectangle.prototype.getAroundLength = function () {
        var l1 = new Line(this.p1, this.p2);
        var l2 = new Line(this.p2, this.p3);
        var l3 = new Line(this.p3, this.p4);
        var l4 = new Line(this.p4, this.p1);
        return l1.getLength() + l2.getLength() + l3.getLength() + l4.getLength();
    };
    Rectangle.prototype.getSymmetricRectangle = function (center) {
        return new Rectangle(Point.getSymmetricPoint(this.p1, center), Point.getSymmetricPoint(this.p2, center), Point.getSymmetricPoint(this.p3, center), Point.getSymmetricPoint(this.p4, center));
    };
    return Rectangle;
}());
var Polygon = /** @class */ (function () {
    function Polygon(points) {
        this.points = points;
        this.lines = [];
        for (var i = 0; i < this.points.length; i++) {
            if (i < this.points.length - 1) {
                this.lines.push(new Line(this.points[i], this.points[i + 1]));
            }
            else {
                this.lines.push(new Line(this.points[i], this.points[0]));
            }
        }
    }
    Polygon.prototype.getAroundLength = function () {
        var result = 0;
        for (var _i = 0, _a = this.lines; _i < _a.length; _i++) {
            var line = _a[_i];
            result += line.getLength();
        }
        return result;
    };
    Polygon.prototype.getSymmetricPolygon = function (center) {
        var points = [];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            points.push(Point.getSymmetricPoint(point, center));
        }
        return new Polygon(points);
    };
    return Polygon;
}());
var Linear = /** @class */ (function () {
    function Linear(formula) {
        this.setForms(formula);
        this.slope;
        this.yIntercept;
        this.a;
        this.b;
        this.vertexForm;
        this.standardForm;
    }
    Linear.judgeForm = function (formula) {
    };
    Linear.prototype.setForms = function (formula) {
        var array = formula.replace(/\s/g, "").split(/\+|x/).filter(function (v) { return v; });
        this.slope = Number(array[0]);
        this.yIntercept = Number(array[1]);
        var stringSlope = String(this.slope);
        var stringYIntercept = this.yIntercept >= 0 ? "+" + String(this.yIntercept) : String(this.yIntercept);
        this.vertexForm = "".concat(stringSlope, "x").concat(stringYIntercept);
    };
    Linear.prototype.getY = function (x) {
        return this.slope * x + this.yIntercept;
    };
    Linear.prototype.getIntersection = function (linear) {
        var a = this.slope;
        var b = this.yIntercept;
        var c = linear.slope;
        var d = linear.yIntercept;
        return new Point((d - b) / (a - c), a * (d - b) / (a - c) + b);
    };
    Linear.prototype.getPerpendicularLinear = function (p) {
        var a = this.slope;
        var x1 = p.x;
        var y1 = p.y;
        return new Linear("".concat(-1 / a, "x+").concat(x1 / a + y1));
    };
    return Linear;
}());
var Quadratic = /** @class */ (function () {
    /**
     * x^2, xの係数, 定数項が0, 1であっても入力すること
     * @param formula
     */
    function Quadratic(formula) {
        this.setForms(formula);
        this.a;
        this.b;
        this.c;
        this.p;
        this.q;
        this.vertexForm;
        this.standardForm;
    }
    /**
     * 入力された関数が一般形であるか、標準形であるか、またはそれ以外であるか判別する
     *  */
    Quadratic.judgeForm = function (formula) {
        if (formula.match(/x\^2/g) &&
            formula.match(/x/g)) {
            return "vertex";
        }
        else if (formula.match(/x/g) &&
            formula.match(/\(/g) &&
            formula.match(/\)/g) &&
            formula.match(/\^2/g)) {
            return "standard";
        }
        else {
            return Manager.displayError(["You MUST use following:", "x", "(", ")", "^2"]);
        }
    };
    /**
     * a, b, c, p, qに値を代入し、一般形と標準形を完成させる
     */
    Quadratic.prototype.setForms = function (formula) {
        if (Quadratic.judgeForm(formula) === "vertex") {
            var array = formula.replace(/\s/g, "").split(/\+|x\^2|x/).filter(function (v) { return v; });
            this.a = Number(array[0]);
            this.b = Number(array[1]);
            this.c = Number(array[2]);
            var stringA = String(this.a);
            var stringB = this.b >= 0 ? "+" + String(this.b) : String(this.b);
            var stringC = this.c >= 0 ? "+" + String(this.c) : String(this.c);
            this.vertexForm = "".concat(stringA, "x^2").concat(stringB, "x").concat(stringC);
            this.p = -this.b / (2 * this.a);
            this.q = -(Math.pow(this.b, 2) - 4 * this.a * this.c) / (4 * this.a);
            var stringP = this.p * (-1) >= 0 ? "+" + String(this.p * (-1)) : String(this.p * (-1));
            var stringQ = this.q >= 0 ? "+" + String(this.q) : String(this.q);
            this.standardForm = "".concat(stringA, "(x").concat(stringP, ")^2").concat(stringQ);
        }
        else if (Quadratic.judgeForm(formula) === "standard") {
            var array = formula.replace(/\s/g, "").split(/\(|\)|\+|x|\^2/).filter(function (v) { return v; });
            this.a = Number(array[0]);
            this.p = Number(array[1]) * (-1);
            this.q = Number(array[2]);
            var stringA = String(this.a);
            var stringP = this.p * (-1) >= 0 ? "+" + String(this.p * (-1)) : String(this.p * (-1));
            var stringQ = this.q >= 0 ? "+" + String(this.q) : String(this.q);
            this.standardForm = "".concat(stringA, "(x").concat(stringP, ")^2").concat(stringQ);
            this.b = -2 * this.a * this.p;
            this.c = this.a * Math.pow(this.p, 2) + this.q;
            var stringB = this.b >= 0 ? "+" + String(this.b) : String(this.b);
            var stringC = this.c >= 0 ? "+" + String(this.c) : String(this.c);
            this.vertexForm = "".concat(stringA, "x^2").concat(stringB, "x").concat(stringC);
        }
    };
    /**
     * 二次関数の頂点を求める
     *  */
    Quadratic.prototype.getVertex = function () {
        return new Point(this.p, this.q);
    };
    /**
     * xを代入して、yの値を求める
     */
    Quadratic.prototype.getY = function (x) {
        return this.a * Math.pow(x, 2) + this.b * x + this.c;
    };
    /**
     * y切片の座標を求める
     */
    Quadratic.prototype.getYIntercept = function () {
        return new Point(0, this.getY(0));
    };
    Quadratic.prototype.getSymmetricQuadratic = function (center) {
        var a = -this.a;
        var p = -Point.getSymmetricPoint(this.getVertex(), center).x;
        var q = Point.getSymmetricPoint(this.getVertex(), center).y;
        return new Quadratic("".concat(a, "(x +").concat(p, ")^2 + ").concat(q));
    };
    Quadratic.prototype.getIntersectionsOfQL = function (linear) {
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var d = linear.slope;
        var e = linear.yIntercept;
        var x1 = (d - b + Math.sqrt(Math.pow((b - d), 2) - 4 * a * (c - e))) / (2 * a);
        var y1 = d * x1 + e;
        var x2 = (d - b - Math.sqrt(Math.pow((b - d), 2) - 4 * a * (c - e))) / (2 * a);
        var y2 = d * x2 + e;
        return [new Point(x1, y1), new Point(x2, y2)];
    };
    Quadratic.prototype.getIntersectionsOfQQ = function (quadratic) {
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var d = quadratic.a;
        var e = quadratic.b;
        var f = quadratic.c;
        if (a === d) {
            var x = (f - c) / (b - e);
            var y = a * Math.pow(x, 2) + b * x + c;
            return [new Point(x, y), new Point(NaN, NaN)];
        }
        else {
            var x1 = (e - b + Math.sqrt(Math.pow((b - e), 2) - 4 * (a - d) * (c - f))) / (2 * (a - d));
            var y1 = a * Math.pow(x1, 2) + b * x1 + c;
            var x2 = (e - b - Math.sqrt(Math.pow((b - e), 2) - 4 * (a - d) * (c - f))) / (2 * (a - d));
            var y2 = a * Math.pow(x2, 2) + b * x2 + c;
            return [new Point(x1, y1), new Point(x2, y2)];
        }
    };
    Quadratic.prototype.getTangentLinear = function (x) {
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var d = 4 * a * x + b;
        var e = c - 4 * a * Math.pow(x, 2);
        return new Linear("".concat(d, "x+").concat(e));
    };
    Quadratic.prototype.getSolution = function () {
        return this.getIntersectionsOfQL(new Linear("0x+0"));
    };
    Quadratic.estimateQuadraticByAandTwoPoints = function (a, p1, p2) {
        var x1 = p1.x;
        var y1 = p1.y;
        var x2 = p2.x;
        var y2 = p2.y;
        var b = ((y2 - y1) - a * (Math.pow(x2, 2) - Math.pow(x1, 2))) / (x2 - x1);
        var c = y1 - a * Math.pow(x1, 2) - b * Math.pow(x1, 2);
        return new Quadratic("".concat(a, "x^2+").concat(b, "x+").concat(c));
    };
    Quadratic.estimateQuadraticByThreePoints = function (p1, p2, p3) {
        var x1 = p1.x;
        var y1 = p1.y;
        var x2 = p2.x;
        var y2 = p2.y;
        var x3 = p3.x;
        var y3 = p3.y;
        var b = (((y3 - y1) * Math.pow(x2, 2) - (y3 - y1) * Math.pow(x1, 2)) -
            ((y2 - y1) * Math.pow(x3, 2) - (y2 - y1) * Math.pow(x1, 2))) /
            ((x2 - x1) * (Math.pow(x1, 2) - Math.pow(x3, 2)) -
                ((x3 - x1) * (Math.pow(x1, 2) - Math.pow(x2, 2))));
        var a = ((y2 - y1) - b * (x2 - x1)) / (Math.pow(x2, 2) - Math.pow(x1, 2));
        var c = y1 - a * Math.pow(x1, 2) - b * x1;
        return new Quadratic("".concat(a, "x^2+").concat(b, "x+").concat(c));
    };
    return Quadratic;
}());
