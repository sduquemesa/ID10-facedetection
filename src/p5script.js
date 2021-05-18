import "./styles.css";
import p5 from "p5/lib/p5.min.js";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants";
import FaceApi from "./classes/faceapi";
import FaceMesh from "./classes/facemesh";

const p5Instance = new p5(sketch => {
  let video;
  let faceapi;

  sketch.setup = () => {
    const canvas = sketch.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    canvas.parent('p5js-container')

    video = sketch.createCapture(sketch.VIDEO);
    video.size(WINDOW_WIDTH, WINDOW_HEIGHT);

    facemesh = new FaceMesh(video);

    // faceapi = new FaceApi(video);
    // faceapi.detect();

    video.hide();

  };

  sketch.draw = () => {
    sketch.clear()
    sketch.background(100,0.99);

    // sketch.image(video, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    // faceapi.draw();
    // facemesh.draw();
  };
}, window.document.getElementById('p5js-container'));

export default p5Instance;