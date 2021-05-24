import * as facedetection from './facedetection.js'
import p5 from "p5/lib/p5.min.js";

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
    const containerElement = document.getElementById('p5js-container')
    const p5Instance = new p5(facedetection.sketch, containerElement);
    console.log(facedetection)
    facedetection.start_hydra();
    document.getElementById("overlay-aceptar").style.display = "none";
    document.getElementById("landing-box").style.display = "none";
    document.getElementById("entrar-button").style.display = "none";
}

console.log('hola!')
