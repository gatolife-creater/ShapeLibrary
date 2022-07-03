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

    /** 
     * 2点間の距離を求める
     * */
    static dist(p1: Point, p2: Point) {
        return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    }

    /**
     * 中点を求める
     *  */
    static getMidpoint(p1: Point, p2: Point) {
        return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    }

    /**
     * 特定の点に対して対称な点を求める
     * */
    static getSymmetricPoint(p: Point, center: Point) {
        let x = center.x - p.x;
        let y = center.y - p.y;
        return new Point(center.x + x, center.y + y);
    }

    /** 
     * 3点間の重心を求める
     * */
    static getBarycenter(p1: Point, p2: Point, p3: Point) {
        return new Point((p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3);
    }

    static getCircumcenter(p1: Point, p2: Point, p3: Point) {
        let l1 = new Line(p1, p2);
        let l2 = new Line(p2, p3);
        // let l3 = new Line(p3, p1);

        let perpendicularBisector1 = l1.getPerpendicularBisector();
        let perpendicularBisector2 = l2.getPerpendicularBisector();

        return perpendicularBisector1.getIntersection(perpendicularBisector2);
    }

    static getOrthocenter(p1: Point, p2: Point, p3: Point) {
        let x1 = p1.x;
        let y1 = p1.y;
        let x2 = p2.x;
        let y2 = p2.y;
        let x3 = p3.x;
        let y3 = p3.y;

        let l1 = new Linear(`${(y2 - y1) / (x2 - x1)}x+${-((y2 - y1) / (x2 - x1)) + y1}`);
        let l2 = new Linear(`${(y3 - y2) / (x3 - x2)}x+${-((y3 - y2) / (x3 - x2)) + y2}`);

        let perpendicularLinear1 = l1.getPerpendicularLinear(p3);
        let perpendicularLinear2 = l2.getPerpendicularLinear(p1);

        return perpendicularLinear1.getIntersection(perpendicularLinear2);
    }

    static getInnerCenter(p1: Point, p2: Point, p3: Point) {
        let A = p1;
        let B = p2;
        let C = p3;

        let AB = new Line(A, B);
        let BC = new Line(B, C);
        let CA = new Line(C, A);

        let P = BC.getDividingPoint(AB.getLength(), CA.getLength());
        let Q = CA.getDividingPoint(BC.getLength(), AB.getLength());
        let R = AB.getDividingPoint(CA.getLength(), BC.getLength());

        let AP = new Line(A, P);
        let BQ = new Line(B, Q);
        let CR = new Line(C, R);

        return AP.getIntersection(BQ);
    }

    static getExcenters(p1: Point, p2: Point, p3: Point) {
        let A = p1;
        let B = p2;
        let C = p3;

        let BA = new Line(A, B);
        let CB = new Line(B, C);
        let AC = new Line(C, A);

        let P = CB.getDividingPoint(BA.getLength(), -AC.getLength());
        let Q = BA.getDividingPoint(AC.getLength(), -CB.getLength());
        let R = AC.getDividingPoint(CB.getLength(), -BA.getLength());

        let AP = new Line(A, P);
        let CQ = new Line(C, Q);
        let BR = new Line(B, R);

        return [AP.getIntersection(CQ), CQ.getIntersection(BR), BR.getIntersection(AP)];
    }

    magnify(center: Point, magnification: number) {
        let l1 = new Line(center, this);
        let p1 = l1.getDividingPoint(-magnification, magnification-1);
        return new Point(p1.x, p1.y);
    }

    /**
     * 原点を求める
     *  */
    static O() {
        return new Point(0, 0);
    }
}

class Line {
    startPoint: Point;
    endPoint: Point;

    constructor(startPoint: Point, endPoint: Point) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    /**
     * 線分を二分する点を求める
     *  */
    getMidpoint() {
        return Point.getMidpoint(this.startPoint, this.endPoint);
    }

    /**
     * 内分点を求める
     *  */
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

    /**
     * 外分点を求める
     *  */
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

    getDividingPoint(m: number, n: number) {
        return new Point(
            (this.startPoint.x * n + this.endPoint.x * m) / (m + n),
            (this.startPoint.y * n + this.endPoint.y * m) / (m + n)
        );
    }

    /**
     * 線の長さを求める
     *  */
    getLength() {
        return Point.dist(this.startPoint, this.endPoint);
    }

    /**
     * 点と直線の距離を求める
     *  */
    getDistBetweenPoint(p: Point) {
        let a =
            (this.endPoint.y - this.startPoint.y) /
            (this.endPoint.x - this.startPoint.x);
        let b = -1;
        let c = this.startPoint.y - a * this.startPoint.x;
        return Math.abs(a * p.x + b + p.y + c) / Math.sqrt(a ** 2 + b ** 2);
    }

    getIntersection(l: Line) {
        let a = (l.endPoint.y - l.startPoint.y) / (l.endPoint.x - l.startPoint.x);
        let b = l.startPoint.y - (l.endPoint.y - l.startPoint.y) / (l.endPoint.x - l.startPoint.x) * l.startPoint.x;
        let c = (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x);
        let d = this.startPoint.y - (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x) * this.startPoint.x;
        return new Point((d - b) / (a - c), a * (d - b) / (a - c) + b);
    }

    getPerpendicularBisector() {
        let x1 = this.startPoint.x;
        let y1 = this.startPoint.y;
        let x2 = this.endPoint.x;
        let y2 = this.endPoint.y;

        let linear = new Linear(`${(y2 - y1) / (x2 - x1)}x+${(-(y2 - y1) / (x2 - x1) * x1) + y1}`);

        return linear.getPerpendicularLinear(this.getMidpoint());
        // 戻り値が関数ってやばくね？
    }

    magnify(center: Point, magnification: number) {
        let l1 = new Line(center, this.startPoint);
        let l2 = new Line(center, this.endPoint);
        let p1 = l1.getDividingPoint(-magnification, magnification - 1);
        let p2 = l2.getDividingPoint(-magnification, magnification - 1);
        return new Line(p1, p2);
    }
}

class Triangle {
    p1: Point;
    p2: Point;
    p3: Point;
    l1: Line;
    l2: Line;
    l3: Line;
    constructor(p1: Point, p2: Point, p3: Point) {
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
    getBarycenter() {
        return Point.getBarycenter(this.p1, this.p2, this.p3);
    }

    getCircumcenter() {
        return Point.getCircumcenter(this.p1, this.p2, this.p3);
    }

    getOrthocenter() {
        return Point.getOrthocenter(this.p1, this.p2, this.p3);
    }

    getInnerCenter() {
        return Point.getInnerCenter(this.p1, this.p2, this.p3);
    }

    getExcenters() {
        return Point.getExcenters(this.p1, this.p2, this.p3);
    }

    /** 
     * 辺の長さの和を求める
     *  */
    getAroundLength() {
        let p1 = new Line(this.p1, this.p2);
        let p2 = new Line(this.p2, this.p3);
        let p3 = new Line(this.p3, this.p1);
        return p1.getLength() + p2.getLength() + p3.getLength();
    }

    /**
     * 三角形の面積を求める
     *  */
    getArea() {
        return (
            (1 / 2) *
            Math.abs(
                (this.p1.x - this.p3.x) * (this.p2.y - this.p3.y) -
                (this.p2.x - this.p3.x) * (this.p1.y - this.p3.y)
            )
        );
    }

    getSymmetricTriangle(center: Point) {
        return new Triangle(
            Point.getSymmetricPoint(this.p1, center),
            Point.getSymmetricPoint(this.p2, center),
            Point.getSymmetricPoint(this.p3, center)
        );
    }

    magnify(center: Point, magnification: number) {
        let l1 = new Line(center, this.p1);
        let l2 = new Line(center, this.p2);
        let l3 = new Line(center, this.p3);
        let p1 = l1.getDividingPoint(-magnification, magnification - 1);
        let p2 = l2.getDividingPoint(-magnification, magnification - 1);
        let p3 = l3.getDividingPoint(-magnification, magnification - 1);
        return new Triangle(p1, p2, p3);
    }
}

class Rectangle {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;
    l1: Line;
    l2: Line;
    l3: Line;
    l4: Line;

    constructor(p1: Point, p2: Point, p3: Point, p4: Point) {
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
    getArea() {
        let triangle1 = new Triangle(this.p1, this.p2, this.p3);
        let triangle2 = new Triangle(this.p2, this.p3, this.p4);
        return triangle1.getArea() + triangle2.getArea();
    }

    /**
     * 辺の長さの和を求める
     *  */
    getAroundLength() {
        let l1 = new Line(this.p1, this.p2);
        let l2 = new Line(this.p2, this.p3);
        let l3 = new Line(this.p3, this.p4);
        let l4 = new Line(this.p4, this.p1);
        return l1.getLength() + l2.getLength() + l3.getLength() + l4.getLength();
    }

    getSymmetricRectangle(center: Point) {
        return new Rectangle(
            Point.getSymmetricPoint(this.p1, center),
            Point.getSymmetricPoint(this.p2, center),
            Point.getSymmetricPoint(this.p3, center),
            Point.getSymmetricPoint(this.p4, center)
        );
    }

    magnify(center: Point, magnification: number) {
        let l1 = new Line(center, this.p1);
        let l2 = new Line(center, this.p2);
        let l3 = new Line(center, this.p3);
        let l4 = new Line(center, this.p4);
        let p1 = l1.getDividingPoint(-magnification, magnification - 1);
        let p2 = l2.getDividingPoint(-magnification, magnification - 1);
        let p3 = l3.getDividingPoint(-magnification, magnification - 1);
        let p4 = l4.getDividingPoint(-magnification, magnification - 1);
        return new Rectangle(p1, p2, p3, p4);
    }
}

class Polygon {

    points: Point[];
    lines: Line[];

    constructor(points: Point[]) {
        this.points = points;
        this.lines = [];
        for (let i = 0; i < this.points.length; i++) {
            if (i < this.points.length - 1) {
                this.lines.push(
                    new Line(this.points[i], this.points[i + 1])
                )
            } else {
                this.lines.push(
                    new Line(this.points[i], this.points[0])
                )
            }
        }
    }

    getAroundLength() {
        let result = 0;
        for (let line of this.lines) {
            result += line.getLength();
        }
        return result;
    }

    getSymmetricPolygon(center: Point) {
        let points: Point[] = [];
        for (let point of this.points) {
            points.push(Point.getSymmetricPoint(point, center));
        }
        return new Polygon(points);
    }

    magnify(center: Point, magnification: number) {
        let magnifiedPoints: Point[] = [];
        for(let point of this.points){
            let l = new Line(center, point);
            let p = l.getDividingPoint(-magnification, magnification-1);
            magnifiedPoints.push(p);
        }
        return new Polygon(magnifiedPoints);
    }
}

class Linear {

    slope: number;
    yIntercept: number;

    a: number;
    b: number;

    vertexForm: string;
    standardForm: string;

    constructor(formula: string) {
        this.setForms(formula);

        this.slope;
        this.yIntercept;

        this.a;
        this.b;

        this.vertexForm;
        this.standardForm;
    }

    static judgeForm(formula: string) {

    }

    setForms(formula: string) {
        let array = formula.replace(/\s/g, "").split(/\+|x/).filter(v => v);
        this.slope = Number(array[0]);
        this.yIntercept = Number(array[1]);

        let stringSlope = String(this.slope);
        let stringYIntercept = this.yIntercept >= 0 ? "+" + String(this.yIntercept) : String(this.yIntercept);
        this.vertexForm = `${stringSlope}x${stringYIntercept}`;
    }

    getY(x: number) {
        return this.slope * x + this.yIntercept;
    }

    getIntersection(linear: Linear) {
        let a = this.slope;
        let b = this.yIntercept;
        let c = linear.slope;
        let d = linear.yIntercept;
        return new Point((d - b) / (a - c), a * (d - b) / (a - c) + b);
    }

    getPerpendicularLinear(p: Point) {
        let a = this.slope;
        let x1 = p.x;
        let y1 = p.y;
        return new Linear(`${-1 / a}x+${x1 / a + y1}`);
    }
}

class Quadratic {
    standardForm: string;
    vertexForm: string;

    a: number;
    b: number;
    c: number;

    p: number;
    q: number;

    /**
     * x^2, xの係数, 定数項が0, 1であっても入力すること
     * @param formula 
     */
    constructor(formula: string) {

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
    static judgeForm(formula: string) {
        if (formula.match(/x\^2/g) &&
            formula.match(/x/g)) {
            return "vertex";
        } else if (formula.match(/x/g) &&
            formula.match(/\(/g) &&
            formula.match(/\)/g) &&
            formula.match(/\^2/g)) {
            return "standard";
        } else {
            return Manager.displayError(["You MUST use following:", "x", "(", ")", "^2"]);
        }
    }

    /**
     * a, b, c, p, qに値を代入し、一般形と標準形を完成させる
     */
    setForms(formula: string) {
        if (Quadratic.judgeForm(formula) === "vertex") {
            let array = formula.replace(/\s/g, "").split(/\+|x\^2|x/).filter(v => v);
            this.a = Number(array[0]);
            this.b = Number(array[1]);
            this.c = Number(array[2]);

            let stringA = String(this.a);
            let stringB = this.b >= 0 ? "+" + String(this.b) : String(this.b);
            let stringC = this.c >= 0 ? "+" + String(this.c) : String(this.c);
            this.vertexForm = `${stringA}x^2${stringB}x${stringC}`;

            this.p = -this.b / (2 * this.a);
            this.q = -(this.b ** 2 - 4 * this.a * this.c) / (4 * this.a);

            let stringP = this.p * (-1) >= 0 ? "+" + String(this.p * (-1)) : String(this.p * (-1));
            let stringQ = this.q >= 0 ? "+" + String(this.q) : String(this.q);
            this.standardForm = `${stringA}(x${stringP})^2${stringQ}`;

        } else if (Quadratic.judgeForm(formula) === "standard") {

            let array = formula.replace(/\s/g, "").split(/\(|\)|\+|x|\^2/).filter(v => v);
            this.a = Number(array[0]);
            this.p = Number(array[1]) * (-1);
            this.q = Number(array[2]);

            let stringA = String(this.a);
            let stringP = this.p * (-1) >= 0 ? "+" + String(this.p * (-1)) : String(this.p * (-1));
            let stringQ = this.q >= 0 ? "+" + String(this.q) : String(this.q);
            this.standardForm = `${stringA}(x${stringP})^2${stringQ}`;

            this.b = -2 * this.a * this.p;
            this.c = this.a * this.p ** 2 + this.q;

            let stringB = this.b >= 0 ? "+" + String(this.b) : String(this.b);
            let stringC = this.c >= 0 ? "+" + String(this.c) : String(this.c);
            this.vertexForm = `${stringA}x^2${stringB}x${stringC}`;
        }
    }

    /**
     * 二次関数の頂点を求める
     *  */
    getVertex() {
        return new Point(this.p, this.q);
    }

    /**
     * xを代入して、yの値を求める
     */
    getY(x: number) {
        return this.a * x ** 2 + this.b * x + this.c;
    }

    /**
     * y切片の座標を求める
     */
    getYIntercept() {
        return new Point(0, this.getY(0));
    }

    getSymmetricQuadratic(center: Point) {
        let a = -this.a;
        let p = -Point.getSymmetricPoint(this.getVertex(), center).x;
        let q = Point.getSymmetricPoint(this.getVertex(), center).y;
        return new Quadratic(`${a}(x +${p})^2 + ${q}`);
    }

    getIntersectionsOfQL(linear: Linear) {
        let a = this.a;
        let b = this.b;
        let c = this.c;
        let d = linear.slope;
        let e = linear.yIntercept;

        let x1 = (d - b + Math.sqrt((b - d) ** 2 - 4 * a * (c - e))) / (2 * a);
        let y1 = d * x1 + e;
        let x2 = (d - b - Math.sqrt((b - d) ** 2 - 4 * a * (c - e))) / (2 * a);
        let y2 = d * x2 + e;

        return [new Point(x1, y1), new Point(x2, y2)];
    }

    getIntersectionsOfQQ(quadratic: Quadratic) {
        let a = this.a;
        let b = this.b;
        let c = this.c;
        let d = quadratic.a;
        let e = quadratic.b;
        let f = quadratic.c;

        if (a === d) {
            let x = (f - c) / (b - e);
            let y = a * x ** 2 + b * x + c;
            return [new Point(x, y), new Point(NaN, NaN)];
        } else {
            let x1 = (e - b + Math.sqrt((b - e) ** 2 - 4 * (a - d) * (c - f))) / (2 * (a - d));
            let y1 = a * x1 ** 2 + b * x1 + c;
            let x2 = (e - b - Math.sqrt((b - e) ** 2 - 4 * (a - d) * (c - f))) / (2 * (a - d));
            let y2 = a * x2 ** 2 + b * x2 + c;

            return [new Point(x1, y1), new Point(x2, y2)];
        }
    }

    getTangentLinear(x: number) {
        let a = this.a;
        let b = this.b;
        let c = this.c;
        let d = 4 * a * x + b;
        let e = c - 4 * a * x ** 2;
        return new Linear(`${d}x+${e}`);
    }

    getSolution() {
        return this.getIntersectionsOfQL(new Linear("0x+0"));
    }

    moveQuadratic(x:number, y:number){
        let newP = -(this.p + x);
        let newQ = this.q + y;
        return new Quadratic(`${this.a}(x+${newP})^2+${newQ}`);
    }

    static estimateQuadraticByAandTwoPoints(a: number, p1: Point, p2: Point) {
        let x1 = p1.x;
        let y1 = p1.y;
        let x2 = p2.x;
        let y2 = p2.y;

        let b = ((y2 - y1) - a * (x2 ** 2 - x1 ** 2)) / (x2 - x1);
        let c = y1 - a * x1 ** 2 - b * x1 ** 2;

        return new Quadratic(`${a}x^2+${b}x+${c}`);
    }

    static estimateQuadraticByThreePoints(p1: Point, p2: Point, p3: Point) {
        let x1 = p1.x;
        let y1 = p1.y;
        let x2 = p2.x;
        let y2 = p2.y;
        let x3 = p3.x;
        let y3 = p3.y;

        let b =
            (
                ((y3 - y1) * x2 ** 2 - (y3 - y1) * x1 ** 2) -
                ((y2 - y1) * x3 ** 2 - (y2 - y1) * x1 ** 2)
            ) /
            ((x2 - x1) * (x1 ** 2 - x3 ** 2) -
                ((x3 - x1) * (x1 ** 2 - x2 ** 2)
                )
            );

        let a = ((y2 - y1) - b * (x2 - x1)) / (x2 ** 2 - x1 ** 2);

        let c = y1 - a * x1 ** 2 - b * x1;

        return new Quadratic(`${a}x^2+${b}x+${c}`);
    }
}