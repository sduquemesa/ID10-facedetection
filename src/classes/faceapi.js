import sketch from "../index";
import ml5 from "ml5";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants";

export default class FaceApi {

  constructor(
    video,
    detectionOptions =
      {
        withLandmarks: true,
        withDescriptors: false,
      }
  ) {
    this.video = video;
    this.detections = [];
    this.faceapi = ml5.faceApi(
      video,
      detectionOptions,
      () => {
        console.log("Face API model ready!");
        // console.log("Face API:", this.faceapi);
      }
    );
  }

  detect() {
    this.faceapi.detect( (err, result) => {

      if (err) {
        console.log(err);
        return;
      }

      // console.log("results", result);
      if (result?.length > 0) {
        this.detections = result;
      }

      this.detect();
    });
  }

  drawBox(detections) {
    for (let i = 0; i < detections.length; i += 1) {
      const alignedRect = detections[i].alignedRect;
      const x = alignedRect._box._x;
      const y = alignedRect._box._y;
      const boxWidth = alignedRect._box._width;
      const boxHeight = alignedRect._box._height;

      sketch.noFill();
      sketch.stroke(161, 95, 251);
      sketch.strokeWeight(2);
      sketch.rect(x, y, boxWidth, boxHeight);
    }
  }

  drawLandmarks(detections) {
    sketch.noFill();
    sketch.stroke(161, 95, 251);
    sketch.strokeWeight(2);

    for (let i = 0; i < detections.length; i += 1) {
      const mouth = detections[i].parts.mouth;
      const nose = detections[i].parts.nose;
      const leftEye = detections[i].parts.leftEye;
      const rightEye = detections[i].parts.rightEye;
      const rightEyeBrow = detections[i].parts.rightEyeBrow;
      const leftEyeBrow = detections[i].parts.leftEyeBrow;

      this.drawPart(mouth, true);
      this.drawPart(nose, false);
      this.drawPart(leftEye, true);
      this.drawPart(leftEyeBrow, false);
      this.drawPart(rightEye, true);
      this.drawPart(rightEyeBrow, false);
    }
  }

  // drawPart(feature, closed) {
  //   for (let i = 0; i < feature.length; i += 1) {
  //     const x = feature[i]._x;
  //     const y = feature[i]._y;
  //     sketch.ellipse(x, y, 2, 2);
  //   }
  // }
  drawPart(feature, closed) {
    sketch.beginShape();
    for (let i = 0; i < feature.length; i += 1) {
      const x = feature[i]._x;
      const y = feature[i]._y;
      sketch.vertex(x, y);
    }

    if (closed === true) {
      sketch.endShape(sketch.CLOSE);
    } else {
      sketch.endShape();
    }
  }

  draw() {
    sketch.push();
    this.drawBox(this.detections);
    this.drawLandmarks(this.detections);
    sketch.pop();
  }
}
