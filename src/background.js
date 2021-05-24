import "./styles.css";
import p5 from "p5/lib/p5.min.js";

const containerElement = document.getElementById('background-container')

let sketch = (sketch) => {

  let scl = 12;
  let xoff, yoff, zoff = 0;
  let speed = 0.02;
  let cols, rows;
  // let alph = ["\\\\\\\\","\\\\\\\\","\\\\\\","||||","|||","||||","///","////","////"];
  let alph = [" ", "1", "0", "1", " "];

  sketch.setup = () => {
    const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    cols = Math.floor(sketch.width / scl);
    rows = Math.floor(sketch.height / scl);
    sketch.noStroke();
    sketch.textSize(scl / 1.5);
    sketch.fill(255);
  };

  sketch.draw = () => {
    sketch.background(0);
    xoff = 0;
    for (var x = 0; x < cols; x++) {
      yoff = 0;
      for (var y = 0; y < rows; y++) {
        sketch.noiseDetail(10);
        // var flow = sketch.noise(xoff, yoff, zoff);
        // var index = Math.round(sketch.map(flow, 0, 1, 0, alph.length));

        sketch.push();
        sketch.translate(x * scl + (scl / 2), y * scl + (scl / 2));
        // sketch.text(alph[index], 0, 0, scl, scl);
        sketch.text(sketch.random(alph), 0, 0, scl, scl);
        // sketch.fill(255);
        // sketch.square(0, 0, scl-2);
        sketch.pop();

        yoff += speed;
      }
      xoff += speed;
    }
    zoff += speed / 3;
  }
}

const p5Instance = new p5(sketch, containerElement);

export default p5Instance;