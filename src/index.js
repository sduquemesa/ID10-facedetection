import "./styles.css";
import p5 from "p5/lib/p5.min.js";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants";
import FaceApi from "./classes/faceapi";
import FaceMesh from "./classes/facemesh";

const p5Instance = new p5(sketch => {
  let video;
  let faceapi;
  let facemesh;

  sketch.setup = () => {
    sketch.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

    video = sketch.createCapture(sketch.VIDEO);
    video.size(WINDOW_WIDTH, WINDOW_HEIGHT);

    facemesh = new FaceMesh(video);

    // faceapi = new FaceApi(video);
    // faceapi.detect();

    video.hide();

  };

  sketch.draw = () => {
    sketch.background(0);

    // sketch.image(video, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    // faceapi.draw();
    facemesh.draw();
  };
});

export default p5Instance;