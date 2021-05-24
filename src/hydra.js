import Hydra from 'hydra-synth';

const hydra = new Hydra({
    detectAudio: false,
    canvas: document.getElementById('hydra-canvas')
})

console.log(hydra)

let funcList = [

    // (rotation, openingX, openingY, height1, heigth2) => {
    //     osc(3*rotation/10,0.6*rotation,0.9)
    //         .rotate(rotation/10)
    //         .blend(
    //             voronoi(25,2,10).color(0,0.1,0.1).brightness(0.01)
    //         )
    //         .pixelate(20+200*openingX,20+200*openingY)
    //         .out()
    // },

    // () => {
    //     osc(3,0.6,0.9).rotate(23).blend(osc(23,0.27,0.46)).pixelate(100,100).out()
    // },

    // () => {
    //     voronoi([10,100].fast(20), 10,2).color([1,1.3,1.5].fast(1000),[1, 1.2].fast(1000), 1, 12).modulateScale(osc(3,-0.5,0).kaleid(50).scale(0.5),15,0).modulate(o0, () => mouse.x * 0.01).out()
    // },

    // () => {
    //     voronoi(300,4,3).color(3,4,233).hue(400).modulate(noise(0.001,1.5,3)).out()
    // },

    // () => {
    //     osc(600,9,0.07999).diff(o0).rotate(0.1).out(o0)
    // },

    () => {
        voronoi(350,0.15)
            .modulateScale(osc(0.1).rotate(Math.sin(time)),.5)
            .thresh(.1)
            .modulateRotate(osc(7),.4)
            .thresh(.7)
            .diff(src(o0).scale(1.8))
            .modulateScale(osc(2).modulateRotate(o0,.74))
            .diff(src(o0).rotate([-.012,.01,-.002,0]).scrollY(0,[-1/199800,0].fast(0.7)))
            .brightness([-.02,-.17].smooth().fast(.5))
            .out()
    },

    // () => {
    //     solid(.7,.45, .125)
    //     .mult(osc(5,.3,.4).rotate(()=>time/2%640).modulate(noise(10,.26,8),.6,),.6)
    //     .modulateRotate(osc(2),.73).rotate(Math.PI/2).modulate(o0,.9)
    //     .luma(.23,.14).saturate(1)
    //     .diff(src(o0).scroll(.1,.3).thresh(.61))
    //     .mult(shape(2,.6,1.6).repeat(10).scrollY(.01,.051)).modulateRotate(osc(()=>(time)*.0005))
    // .out()
    // },

    // () => {
    //     noise(10,2)
    //     .modulate(o0, 1).color(-1,.2,.5)
    //     .mask(shape(3, .5, 0).scale(2).rotate(0,time * .0001))
    //     .out(o0)
    //     src(o0)
    //     .add(src(o0).scale(.5).rotate([1,0].smooth()))
    //     .mult(noise(3,.5).pixelate(20,20))
    //     .add(osc(.5,1,.1).blend(osc(100000,1,-1).rotate(0,.1),.5)).modulate(o1)
    //     .out(o1)
    //     render(o1)
    // },

    // (rotation, openingX, openingY, height1, heigth2) => {
    //     render(o2)
    //     s0.initCam()
    //     src(o0)
    //     .blend(s0, 0.4)
    //     .modulate(o0, 0.1)
    //     // .saturate(1.01)
    //     // .contrast(1.01)
    //     // .colorama()
    //     // .scale(1.01)
    //     .out(o0)
    //     voronoi(50+300*openingY,0.05,0.1)
    //     .rotate(rotation,0)
    //     .modulate(o0, 5*height1)
    //     .out(o1)
    //     src(o0).diff(o1,1).out(o2)
    // },

    // (rotation, openingX, openingY, height1, heigth2) => {
    //     s0.initCam()
    //     src(s0)
    //         .blend(o0)
    //         // .saturate(1.4)
    //     .colorama(-0.1+0.2*rotation)
    //     .kaleid(8)
    //     .out(o0)
    //     shape(176, () => openingY)
    //     .modulate(noise(1,height1))
    //     .out(o1)
    //     src(o0)
    //     .modulateScale(o1)
    //     .out(o3)
    //     render(o3)
    // },

    // (rotation, openingX, openingY, height1, heigth2) => {
    //     s0.initCam();
    //     src(s0)
    //         // .rotate(rotation)
    //         .repeat(openingX*2+5,openingY*2+5,height1, heigth2)
    //         .modulate(o0,rotation)
    //         .saturate(0)
    //         .out();
    //     render(o0);
    // }

]

// let randomIndex = Math.floor(Math.random() * funcList.length)
// let func = funcList[randomIndex]

var hydraLoopId = setInterval(function(){
    if (facemesh.predictions[0] !== undefined) {
        let faceWidth = facemesh.predictions[0].boundingBox.bottomRight[0][0] - facemesh.predictions[0].boundingBox.topLeft[0][0]
        let faceHeight = facemesh.predictions[0].boundingBox.bottomRight[0][1] - facemesh.predictions[0].boundingBox.topLeft[0][1]

        let predictions = facemesh.predictions[0].annotations

        let faceRotation = (predictions.midwayBetweenEyes[0][0] - predictions.noseTip[0][0])/15
        let mouthOpeningY = (predictions.lipsLowerInner[5][1] - predictions.lipsUpperInner[5][1])/faceHeight
        let mouthOpeningX = (predictions.lipsLowerInner[9][0] - predictions.lipsLowerInner[0][0])/faceWidth
        let eyeToEyebrowLeft = (predictions.leftEyeLower3[4][1] - predictions.leftEyebrowUpper[4][1])/faceHeight
        let eyeToEyebrowRight = (predictions.rightEyeLower3[4][1] - predictions.rightEyebrowUpper[4][1])/faceHeight

        func(faceRotation,mouthOpeningX,mouthOpeningY,eyeToEyebrowLeft,eyeToEyebrowRight)

        console.log(faceRotation, mouthOpeningX, mouthOpeningY, eyeToEyebrowLeft, eyeToEyebrowRight)
    }
}, 50);