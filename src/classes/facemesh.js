import sketch from "../facedetection";
import ml5 from "ml5";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants";

export default class FaceMesh {

    constructor(video) {
        this.facemesh = ml5.facemesh(video, {maxFaces: 1},() => console.log("Facemesh model ready!"));
        this.predictions = [];
        this.facemesh.on("predict", results => {
            this.predictions = results;
        });
    }

    draw() {
        this.drawKeypoints();
    }

    // drawKeypoints() {
    //     for (let i = 0; i < this.predictions.length; i += 1) {
    //         const keypoints = this.predictions[i].mesh;

    //         // Draw facial keypoints.
    //         for (let j = 0; j < keypoints.length; j += 1) {
    //             const [x, y] = keypoints[j];

    //             sketch.push();
    //             sketch.fill(0, 255, 0);
    //             sketch.ellipse(x, y, 5, 5);
    //             sketch.pop();
    //         }
    //     }
    // }

    drawKeypoints() {
        for (let i = 0; i < this.predictions.length; i += 1) {
            const keypoints = this.predictions[i].scaledMesh;

            // Draw facial keypoints.
            for (let j = 0; j < keypoints.length; j += 1) {
                const [x, y] = keypoints[j];

                sketch.push();
                sketch.fill(255);
                sketch.noStroke();
                sketch.ellipse(x, y, 4, 4);
                sketch.pop();
            }

            // Shuffle array
            this.shuffle(keypoints)

            // Draw facial keypoints.
            // for (let j = 0; j < keypoints.length-1; j += 1) {
            //     const [x1, y1] = keypoints[j];
            //     const [x2, y2] = keypoints[j+1];

            //     sketch.push();
            //     sketch.stroke(0,50);
            //     sketch.strokeWeight(2);
            //     sketch.line(x1, y1, x2, y2);
            //     sketch.pop();
            // }

            // for (let j = 0; j < keypoints.length-2; j += 3) {
            //     const [x1, y1] = keypoints[j];
            //     const [x2, y2] = keypoints[j+1];
            //     const [x3, y3] = keypoints[j+2];

            //     sketch.push();
            //     sketch.stroke(200,50);
            //     sketch.fill(200,20);
            //     sketch.strokeWeight(0.75);
            //     sketch.triangle(x1, y1, x2, y2, x3, y3);
            //     sketch.pop();
            // }
        }
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

}