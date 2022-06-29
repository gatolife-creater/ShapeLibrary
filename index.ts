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

    getAroundLength(){
        let result = 0;
        for(let line of this.lines){
            result += line.getLength();
        }
        return result;
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
}