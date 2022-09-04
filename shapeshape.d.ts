declare class Manager {
    static displayError(conditions: string[]): void;
}
declare class Point {
    x: number;
    y: number;
    /**
     *
     * @param x X coordinate
     * @param y Y coordinate
     */
    constructor(x: number, y: number);
    /**
     * Find the distance between 2 points.
     * 2点間の距離を求める。
     * */
    static dist(p1: Point, p2: Point): number;
    /**
     * In search of the middle point.
     * 中点を求める。
     *  */
    static getMidpoint(p1: Point, p2: Point): Point;
    /**
     * Finding a symmetrical point for specific points.
     * 特定の点に対して対称な点を求める。
     * */
    static getSymmetricPoint(p: Point, center: Point): Point;
    /**
     * Finding the center of gravity between 3 points.
     * 3点間の重心を求める。
     * */
    static getBarycenter(p1: Point, p2: Point, p3: Point): Point;
    /**
     * Finding the circumcenter.
     * 外心を求める。
     */
    static getCircumcenter(p1: Point, p2: Point, p3: Point): Point;
    /**
     * Finding the orthocenter.
     * 垂心を求める。
     */
    static getOrthocenter(p1: Point, p2: Point, p3: Point): Point;
    /**
     * Finding the inner center.
     * 内心を求める。
     */
    static getInnerCenter(p1: Point, p2: Point, p3: Point): Point;
    /**
     * Finding the excenters.
     * 傍心を求める。
     */
    static getExcenters(p1: Point, p2: Point, p3: Point): Point[];
    /**
     * Finding a secondary function through 3 points.
     * 3点を通る二次関数を求める。
     */
    static estimateQuadraticByThreePoints(p1: Point, p2: Point, p3: Point): Quadratic;
    /**
     * Enlarge and shrink according to the reference point.
     * 基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number): Point;
    /**
     * Find the origin.
     * 原点を求める。
     *  */
    static O(): Point;
    draw(): void;
}
declare class Line {
    start: Point;
    end: Point;
    /**
     *
     * @param start Coordinate of start point
     * @param end Coordinate of end point
     */
    constructor(start: Point, end: Point);
    /**
     * Find the point that divides the line.
     * 線分を二分する点を求める。
     *  */
    getMidpoint(): Point;
    /**
     * Find the inner division.
     * 内分点を求める。
     *  */
    getInteriorPoint(m: number, n: number): void | Point;
    /**
     * Finding the outer sorting point.
     * 外分点を求める。
     *  */
    getExteriorPoint(m: number, n: number): void | Point;
    /**
     * Incidental divisions and outer sarings.
     * 内分点、外分点を求める。
     */
    getDividingPoint(m: number, n: number): Point;
    /**
     * Find the length of the line.
     * 線の長さを求める。
     *  */
    getLength(): number;
    /**
     * Find the distance between a point and a straight line.
     * 点と直線の距離を求める。
     *  */
    getDistBetweenPoint(p: Point): number;
    /**
     * Finding the intersection between straight lines, including extensions.
     * 延長線上を含め直線同士の交点を求める。
     */
    getIntersection(l: Line): Point;
    /**
     * Finding the intersection between straight lines.
     * 直線同士の交点を求める。
     */
    getIntersectionStrict(l: Line): Point;
    /**
     * Finding a vertical binary division.
     * 垂直二等分線を求める。
     */
    getPerpendicularBisector(): Linear;
    /**
     * Enlarge a straight line according to the reference point.
     * 直線を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number): Line;
    draw(): void;
}
declare class Triangle {
    p1: Point;
    p2: Point;
    p3: Point;
    l1: Line;
    l2: Line;
    l3: Line;
    /**
     *
     * @param p1 First point of the triangle.
     * @param p2 Second point of the triangle.
     * @param p3 Third point of the triangle.
     */
    constructor(p1: Point, p2: Point, p3: Point);
    /**
     * Finding a triangular center of gravity.
     * 三角形の重心を求める。
     *  */
    getBarycenter(): Point;
    /**
     * Finding the circumcenter.
     * 三角形の外心を求める。
     */
    getCircumcenter(): Point;
    /**
     * Finding the circumscribed circle.
     * 三角形の外接円を求める。
     */
    getCircumscribedCircle(): Circle;
    /**
     * Finding the orthocenter.
     * 三角形の垂心を求める。
     */
    getOrthocenter(): Point;
    /**
     * Finding the inner center.
     * 三角形の内心を求める。
     */
    getInnerCenter(): Point;
    /**
     * Finding the inscribe circle.
     * 三角形の内接円を求める。
     */
    getInscribedCircle(): Circle;
    /**
     * Finding the excenters.
     * 三角形の傍心を求める。
     */
    getExcenters(): Point[];
    /**
     * Find the sum of the length of the side.
     * 辺の長さの和を求める。
     *  */
    getAroundLength(): number;
    /**
     * Find a triangle area.
     * 三角形の面積を求める。
     *  */
    getArea(): number;
    /**
     * In search of a symmetrical triangle for the reference point.
     * 基準点に対して対称な三角形を求める。
     */
    getSymmetricTriangle(center: Point): Triangle;
    /**
     * Enlarge and reduce the triangle according to the reference point.
     * 三角形を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number): Triangle;
    draw(): void;
}
declare class Quad {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;
    l1: Line;
    l2: Line;
    l3: Line;
    l4: Line;
    /**
     *
     * @param p1 First point of the quad.
     * @param p2 Second point of the quad.
     * @param p3 Third point of the quad.
     * @param p4 Forth point of the quad.
     */
    constructor(p1: Point, p2: Point, p3: Point, p4: Point);
    /**
     * Find a square area.
     * 四角形の面積を求める。
     *  */
    getArea(): number;
    /**
     * Find the sum of the length of the side.
     * 辺の長さの和を求める。
     *  */
    getAroundLength(): number;
    /**
     * Find a symmetrical square for reference points.
     * 基準点に対して対称な四角形を求める。
     */
    getSymmetricQuad(center: Point): Quad;
    /**
     * Enlarge and reduce the square according to the reference point.
     * 四角形を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number): Quad;
    draw(): void;
}
declare class Polygon {
    points: Point[];
    lines: Line[];
    /**
     *
     * @param points Points tha make up the polygon.
     */
    constructor(points: Point[]);
    /**
     * Find the sum of the length of the polygon.
     * 多角形の辺の長さの和を求める。
     */
    getAroundLength(): number;
    /**
     * Find a symmetrical polygon for reference points.
     * 基準点に対して対称な多角形を求める。
     */
    getSymmetricPolygon(center: Point): Polygon;
    /**
     * Enlarge and reduce the polygon according to the reference point.
     * 多角形を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number): Polygon;
    draw(): void;
}
declare class Circle {
    center: Point;
    x: number;
    y: number;
    r: number;
    d: number;
    /**
     *
     * @param x X coordinate of the circle.
     * @param y Y coordinate of the circle.
     * @param r Radius of the circle.
     */
    constructor(x: number, y: number, r: number);
    /**
     * Find the length of the circumference.
     * 円周の長さを求める。
     */
    getAround(): number;
    /**
     * Find the area of the circle.
     * 円の面積をもとめる。
     */
    getArea(): number;
    /**
     * Find a symmetrical circle for the reference point.
     * 基準点に対して対称な円を求める。
     */
    getSymmetricCircle(center: Point): Circle;
    getIntersectionsOfCL(linear: Linear): Point[];
    /**
     * Enlarge and reduce the circle according to the reference point.
     * 円を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number): Circle;
    draw(): void;
}
declare class Point3D {
    x: number;
    y: number;
    z: number;
    /**
     *
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     */
    constructor(x: number, y: number, z: number);
    static dist(p1: Point3D, p2: Point3D): number;
    /**
     * In search of the middle point.
     * 中点を求める。
     *  */
    static getMidpoint(p1: Point3D, p2: Point3D): Point3D;
    /**
     * Finding a symmetrical point for specific points.
     * 特定の点に対して対称な点を求める。
     * */
    static getSymmetricPoint(p: Point3D, center: Point3D): Point3D;
    /**
     * Finding the center of gravity between 3 points.
     * 3点間の重心を求める。
     * */
    static getBarycenter(p1: Point3D, p2: Point3D, p3: Point3D): Point3D;
    /**
     * 外心を求める
     */
    /**
     * 垂心を求める
     */
    /**
     * 内心を求める
     */
    /**
     * 傍心を求める
     */
    /**
     * Enlarge and reduce the point according to the reference point.
     * 点を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number): Point3D;
    /**
     * Find the origin
     * 原点を求める。
     *  */
    static O(): Point3D;
    draw(): void;
}
declare class Line3D {
    start: Point3D;
    end: Point3D;
    /**
     *
     * @param start Coordinate of start point.
     * @param end Coordinate of end point.
     */
    constructor(start: Point3D, end: Point3D);
    /**
     * Find the length of the line.
     * 線の長さを求める。
     *  */
    getLength(): number;
    /**
     * Finding the point that divides lines
     * 線を二等分する点を求める。
     *  */
    getMidpoint(): Point3D;
    /**
     * Find the inner division.
     * 内分点を求める。
     *  */
    getInteriorPoint(m: number, n: number): void | Point3D;
    /**
     * Finding the outer sorting point.
     * 外分点を求める。
     *  */
    getExteriorPoint(m: number, n: number): void | Point3D;
    /**
     * Incidental divisions and outer sarings.
     * 内分点、外分点を求める。
     */
    getDividingPoint(m: number, n: number): Point3D;
    /**
     * 点と直線の距離を求める
     *  */
    /**
     * 延長線上を含め直線同士の交点を求める
     */
    /**
     * 直線同士の交点を求める
     */
    /**
     * 垂直二等分線を求める
     */
    /**
     * Enlarge and reduce the line according to the reference point.
     * 線を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number): Line3D;
    draw(): void;
}
declare class Triangle3D {
    p1: Point3D;
    p2: Point3D;
    p3: Point3D;
    l1: Line3D;
    l2: Line3D;
    l3: Line3D;
    /**
     *
     * @param p1 First point of the Triangle.
     * @param p2 Second point of the Triangle.
     * @param p3 Third point of the Triangle.
     */
    constructor(p1: Point3D, p2: Point3D, p3: Point3D);
    /**
     * Finding a triangular center of gravity.
     * 三角形の重心を求める。
     */
    getBarycenter(): Point3D;
    /**
     * Find the sum of the length of the side.
     * 辺の長さの和を求める。
     *  */
    getAroundLength(): number;
    /**
     * Find a triangle area.
     * 三角形の面積を求める。
     *  */
    getArea(): number;
    /**
     * In search of a symmetrical triangle for the reference point.
     * 基準点に対して対称な三角形を求める。
     */
    getSymmetricTriangle(center: Point3D): Triangle3D;
    /**
     * Enlarge and reduce the triangle according to the reference point.
     * 三角形を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number): Triangle3D;
    draw(): void;
}
declare class Quad3D {
    p1: Point3D;
    p2: Point3D;
    p3: Point3D;
    p4: Point3D;
    l1: Line3D;
    l2: Line3D;
    l3: Line3D;
    l4: Line3D;
    /**
     *
     * @param p1 First point of the Quad.
     * @param p2 Second point of the Quad.
     * @param p3 Third point of the Quad.
     * @param p4 Forth point of the Quad.
     */
    constructor(p1: Point3D, p2: Point3D, p3: Point3D, p4: Point3D);
    /**
     * Enlarge and reduce the square according to the reference point.
     * 四角形を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number): Quad3D;
    draw(): void;
}
declare class Box {
    x: number;
    y: number;
    z: number;
    w: number;
    h: number;
    d: number;
    constructor(x: number, y: number, z: number, w: number, h: number, d: number);
    /**
     * Find the surface area.
     * 表面積を求める。
     */
    getSurfaceArea(): number;
    /**
     * Seek the volume.
     * 体積を求める。
     */
    getVolume(): number;
    /**
     * Enlarge and shrink the rectangular body according to the reference point.
     * 直方体を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number): Box;
    draw(): void;
}
declare class Sphere {
    center: Point3D;
    x: number;
    y: number;
    z: number;
    r: number;
    /**
     *
     * @param x X coordinate of the center of the sphere.
     * @param y Y coordinate of the center of the sphere.
     * @param z Z coordinate of the center of the sphere.
     * @param r Radius of the sphere.
     */
    constructor(x: number, y: number, z: number, r: number);
    /**
     * Find the surface area.
     * 表面積を求める。
     */
    getSurfaceArea(): number;
    /**
     * Seek the volume.
     * 体積を求める。
     */
    getVolume(): number;
    /**
     * Enlarge and shrink the ball according to the reference point.
     * 球を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point3D, magnification: number): Sphere;
    draw(): void;
}
declare class Linear {
    slope: number;
    yIntercept: number;
    a: number;
    b: number;
    vertexForm: string;
    standardForm: string;
    /**
     *
     * @param formula Formula.
     */
    constructor(formula: string);
    setForms(formula: string): void;
    /**
     * Substitute X and find the value of Y.
     * xを代入して、yの値を求める。
     */
    getY(x: number): number;
    /**
     * Finding the intersection between primary functions.
     * 一次関数同士の交点を求める。
     */
    getIntersection(linear: Linear): Point;
    /**
     * Finding primary functions that are perpendicular to the standard primary functions.
     * 基準となる一次関数に垂直な一次関数をもとめる。
     */
    getPerpendicularLinear(p: Point): Linear;
    /**
     * Finding a symmetrical point for a straight line.
     * 直線に対して対称な点を求める。
     */
    getSymmetricPointToL(p: Point): Point;
    /**
     * Primary functions are expanded according to the reference point.
     * 一次関数を基準点に合わせて拡大縮小する。
     */
    magnify(center: Point, magnification: number): Linear;
    /**
     * Find the primary function that passes through 2 points.
     * 2点を通る一次関数を求める。
     */
    static estimateLinearByTwoPoints(p1: Point, p2: Point): Linear;
    draw(min: number, max: number): void;
}
declare class Quadratic {
    standardForm: string;
    vertexForm: string;
    a: number;
    b: number;
    c: number;
    p: number;
    q: number;
    /**
     * Formula.
     * Enter even if the coefficient of x^2, x is 0, 1.
     * x^2, xの係数, 定数項が0, 1であっても入力すること。
     * @param formula
     */
    constructor(formula: string);
    /**
     * Determines whether the entered function is a general form, a standard form, or something else.
     * 入力された関数が一般形であるか、標準形であるか、またはそれ以外であるか判別する。
     *  */
    static judgeForm(formula: string): void | "vertex" | "standard";
    /**
     * Assign a value to a, b, c, p, q to complete general and standard forms.
     * a, b, c, p, qに値を代入し、一般形と標準形を完成させる。
     */
    setForms(formula: string): void;
    /**
     * Finding the top of the secondary function.
     * 二次関数の頂点を求める。
     *  */
    getVertex(): Point;
    /**
     * Substitute X and find the value of Y.
     * xを代入して、yの値を求める。
     */
    getY(x: number): number;
    /**
     * Find the coordinates of y cut pieces.
     * y切片の座標を求める。
     */
    getYIntercept(): Point;
    /**
     * Finding a symmetrical secondary function for the reference point.
     * 基準点に対して対称な二次関数を求める。
     */
    getSymmetricQuadratic(center: Point): Quadratic;
    getSymmetricQuadraticToX_Axis(): Quadratic;
    getSymmetricQuadraticToY_Axis(): Quadratic;
    /**
     * Find the intersection of secondary and primary functions.
     * 二次関数と一次関数の交点を求める。
     */
    getIntersectionsOfQL(linear: Linear): Point[];
    /**
     * In search of intersections between secondary functions.
     * 二次関数同士の交点を求める。
     */
    getIntersectionsOfQQ(quadratic: Quadratic): Point[];
    /**
     * Finding a secondary function.
     * 二次関数の接線を求める。
     */
    getTangentLinear(x: number): Linear;
    /**
     * Finding a secondary function line.
     * 二次関数の方線を求める。
     */
    getNormalLinear(x: number): Linear;
    /**
     * Finding a secondary equation solution.
     * 二次方程式の解を求める。
     */
    getSolution(): Point[];
    /**
     * Enlarge the secondary function according to the reference point.
     * 二次関数を基準点に合わせて拡大する。
     */
    magnify(center: Point, magnification: number): Quadratic;
    /**
     * Move the secondary function parallel.
     * 二次関数を平行移動させる。
     */
    moveQuadratic(x: number, y: number): Quadratic;
    /**
     * Find the secondary function from the value of A and the two points that pass.
     * aの値と、通る2点から二次関数を求める。
     */
    static estimateQuadraticByAandTwoPoints(a: number, p1: Point, p2: Point): Quadratic;
    /**
     * Finding a secondary function through 3 points.
     * 3点を通る二次関数を求める。
     */
    static estimateQuadraticByThreePoints(p1: Point, p2: Point, p3: Point): Quadratic;
    differentiate(): Linear;
    draw(min: number, max: number): void;
}
