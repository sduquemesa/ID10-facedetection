import { toCanvas } from 'qrcode';
import jsonpack from 'jsonpack'

var canvas = window.document.getElementById('qr-canvas')

var qrLoopId = setInterval(function(){
    if (facemesh.predictions[0] !== undefined) {
        // let string_data = JSON.stringify(facemesh.predictions[0].boundingBox)
        let annotations = facemesh.predictions[0].annotations
        let data = {
            silhouette: annotations.silhouette
        }
        // const string_data = jsonpack.pack(data)
        const string_data = JSON.stringify(data)
        console.log(facemesh.predictions[0])
        toCanvas(canvas, string_data, function (error) {
            if (error) console.error(error)
            console.log('success!');
          })
    }
}, 500);
