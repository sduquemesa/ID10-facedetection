import "./styles.css";
import p5 from "p5/lib/p5.min.js";
import FaceMesh from "./classes/facemesh";
import Hydra from 'hydra-synth';
import QRCode from 'qrcode';

let facemesh;
var sketchRef;
var url;
var canvas;

export const start_hydra = () => {
  const hydra = new Hydra({
    detectAudio: false,
    canvas: document.getElementById('hydra-canvas'),
    precision: 'highp'
  })

  let hydra_func = (rotation, openingX, openingY, height1, heigth2) => {
    s0.initCam();
    src(s0)
      .rotate(rotation / 4)
      .repeat(openingX * 6 + 5, openingY * 6 + 5, height1, heigth2)
      .modulate(o0, 0.2 - 3 * openingY)
      .saturate(() => (Math.sin(time * 0.1) + 1) / 2)
      .pixelate(100, 100)
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

export let p5sketch = (sketch) => {

  let video;
  const width = containerElement.getBoundingClientRect().width
  const height = containerElement.getBoundingClientRect().height

  sketch.setup = () => {
    canvas = sketch.createCanvas(width, height);

    video = sketch.createCapture(sketch.VIDEO);
    video.size(width, height);

    facemesh = new FaceMesh(video, sketch);

    video.hide();

    let button = sketch.select('#button-capture');
    button.mousePressed(sketch.exportImage);

  };

  sketch.draw = () => {
    sketch.clear()
    sketch.background(10, 200)

    // sketch.push()
    // sketch.image(video, 0, 0, width, height);
    // sketch.filter(sketch.THRESHOLD);
    // sketch.tint(255, 127);
    // sketch.pop()

    facemesh.draw();

  };

  sketch.exportImage = () => {
    let pg = sketch.createGraphics(width, height);

    pg.image(video, 0, 0, width, height);
    pg.filter(sketch.POSTERIZE,10);
    pg.tint(255,  100);
    facemesh.overlay(pg);

    var canvas = pg.canvas;
    var dataURL = canvas.toDataURL("image/png");
    var data = atob( dataURL.substring( "data:image/png;base64,".length ) ),
    asArray = new Uint8Array(data.length);
    for( var i = 0, len = data.length; i < len; ++i ) {
      asArray[i] = data.charCodeAt(i);
  }
  var blob = new Blob( [ asArray.buffer ], {type: "image/png"} );
    var newTab = window.open('about:blank', 'image from canvas');
    newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
    let form = new FormData();
    form.append('upload',blob)
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: form
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      url = data.url

      sketch.clear()
      sketch.noLoop()
      sketch.clear()

      document.getElementById('qr-container').style.display = "block";

      QRCode.toCanvas(document.getElementById('qr-canvas'), url, function (error) {
        if (error) console.error(error)
        console.log(canvas);
      })

    });
  }



}
