# ShapeShape

![example](imgs/Screen%20Shot%202022-07-02%20at%2017.38.09%20copy.png)
## Purpose
This library makes it easier to calculate shapes and mathematical functions.

ex.) 
* Triangle centers
* Tangent lines of quadratic functions
* Figure scaling

Also, you can make the following by applying this library.
* Prediction of ball drop location
* Pseudo 3D

<br>You can watch some examples in this video.</br>
https://www.youtube.com/watch?v=hW4a9Aw-8ms
<br></br>

## Usage

### index.html
```
<!DOCTYPE html>
<html lang="en">

<head>
    <script src="https://cdn.jsdelivr.net/gh/gatolife-creater/ShapeShape@latest/shapeshape.min.js"></script>
    <title>Document</title>
    <style>
        canvas{
            position:fixed;
            top:0;
            left:0;
        }
    </style>
</head>

<body>
    <script src="sketch.js"></script>
</body>

</html>
```

### sketch.js
```
let tri = new Triangle(
  new Point(0, 0),
  new Point(100, 100),
  new Point(-200, 100)
);

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(30);
  translate(width / 2, height / 2);
  stroke("white");
  strokeWeight(1);
  tri.draw();
  tri
    .magnify(Point.O(), 0.5) // 図形を拡大縮小
    .getSymmetricTriangle(Point.O()) // ある点に対して対称な三角形を取得
    .draw();
  
  stroke("red");
  strokeWeight(10);
  tri
    .getBarycenter() //　重心を取得
    .draw();
  tri
    .getInnerCenter() // 内心を取得
    .draw();
}
```

### result
<image src="imgs/usage.png" width="80%">


## Tip
There are many example programs in the <strong>/test</strong> folder.<br></br>
Download and check them if you need further information.