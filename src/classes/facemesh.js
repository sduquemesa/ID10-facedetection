import sketch from "../index";
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
                // the 2 multiplying here scales the keypoints to fit screen
                sketch.ellipse(2*x, 2*y, 5, 5);
                sketch.pop();
            }
        }
    }

}