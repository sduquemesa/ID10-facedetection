import * as facedetection from './facedetection.js'
import p5 from "p5/lib/p5.min.js";

let p5Instance;

window.infoOn = () => {
    document.getElementById("overlay").style.display = "block";
}

window.infoOff = () => {
    document.getElementById("overlay").style.display = "none";
}

window.onEntrarClick = () => {
    document.getElementById("overlay-aceptar").style.display = "block";
}

window.onAceptar = () => {
    document.getElementById("overlay-aceptar").style.display = "none";
    document.getElementById("landing-box").style.display = "none";
    document.getElementById("entrar-button").style.display = "none";
    document.getElementById("info-button").style.color = "white";
    document.getElementById("button-capture").style.display = "block";
    const containerElement = document.getElementById('p5js-container')
    p5Instance = new p5(facedetection.p5sketch, containerElement);
    facedetection.start_hydra();
}
