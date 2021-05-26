import "./styles.css";
import p5 from "p5/lib/p5.min.js";
import FaceMesh from "./classes/facemesh";
import Hydra from 'hydra-synth';

let facemesh;

export const start_hydra = () => {
  const hydra = new Hydra({
    detectAudio: false,
    canvas: document.getElementById('hydra-canvas'),
    precision: 'highp'
  })

  console.log(hydra)

  let hydra_func = (rotation, openingX, openingY, height1, heigth2) => {
    s0.initCam();
    src(s0)
      .rotate(rotation / 4)
      .repeat(openingX * 6 + 5, openingY * 6 + 5, height1, heigth2)
      .modulate(o0, 0.2 - 3 * openingY)
      .saturate(() => (Math.sin(time * 0.1)+1)/2)
      .pixelate(100,100)
      .blend(o0)
      .out();
    render(o0);
  }

  var hydraLoopId = setInterval(function () {
    if (facemesh.predictions[0] !== undefined) {
      let faceWidth = facemesh.predictions[0].boundingBox.bottomRight[0][0] - facemesh.predictions[0].boundingBox.topLeft[0][0]
      let faceHeight = facemesh.predictions[0].boundingBox.bottomRight[0][1] - facemesh.predictions[0].boundingBox.topLeft[0][1]

      let predictions = facemesh.predictions[0].annotations

      let faceRotation = (predictions.midwayBetweenEyes[0][0] - predictions.noseTip[0][0]) / 15
      let mouthOpeningY = (predictions.lipsLowerInner[5][1] - predictions.lipsUpperInner[5][1]) / faceHeight
      let mouthOpeningX = (predictions.lipsLowerInner[9][0] - predictions.lipsLowerInner[0][0]) / faceWidth
      let eyeToEyebrowLeft = (predictions.leftEyeLower3[4][1] - predictions.leftEyebrowUpper[4][1]) / faceHeight
      let eyeToEyebrowRight = (predictions.rightEyeLower3[4][1] - predictions.rightEyebrowUpper[4][1]) / faceHeight

      hydra_func(faceRotation, mouthOpeningX, mouthOpeningY, eyeToEyebrowLeft, eyeToEyebrowRight)
    }
  }, 50);
}

const containerElement = document.getElementById('p5js-container')

export let sketch = (sketch) => {
  let video;
  const width = containerElement.getBoundingClientRect().width
  const height = containerElement.getBoundingClientRect().height

  sketch.setup = () => {
    const canvas = sketch.createCanvas(width, height);

    video = sketch.createCapture(sketch.VIDEO);
    video.size(width, height);

    facemesh = new FaceMesh(video, sketch);

    video.hide();

  };

  sketch.draw = () => {
    sketch.clear()
    sketch.background(10,200)

    // sketch.push()
    // sketch.image(video, 0, 0, width, height);
    // sketch.filter(sketch.THRESHOLD);
    // sketch.tint(255, 127);
    // sketch.pop()

    facemesh.draw();
  };
}

