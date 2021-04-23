import sketch from "..";
import ml5 from "ml5";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants";

export default class FaceMesh {

    constructor(video) {
        this.facemesh = ml5.facemesh(video, () => console.log("Facemesh model ready!"));
        this.predictions = [];
        this.facemesh.on("predict", results => {
            this.predictions = results;
        });
    }

    draw() {
        this.drawKeypoints();
    }

    drawKeypoints() {
        for (let i = 0; i < this.predictions.length; i += 1) {
            const keypoints = this.predictions[i].scaledMesh;

            // Draw facial keypoints.
            for (let j = 0; j < keypoints.length; j += 1) {
                const [x, y] = keypoints[j];

                sketch.push();
                sketch.fill(0, 255, 0);
                sketch.ellipse(x, y, 5, 5);
                sketch.pop();
            }
        }
    }

}