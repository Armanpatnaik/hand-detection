const modelParams = {
    flipHorizontal: true,
    imageScaleFactor:0.7,
    maxNumBoxes: 20,
    iouThershold: 0.5,
    scoreThershold: 0.79,
}
navigator.getUserMedia= 
navigator.getUserMedia || 
navigator.webkitGetUserMedia || 
navigator.mozGetUserMedia || 
navigator.msGetUserMedia;
const audio = document.querySelector("#audio");
const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const context  = canvas.getContext('2d');// provides the 2D rendering context for the drawing surface of a <canvas> element. It is used for drawing shapes, text, images, and other objects.
let model;
handTrack.startVideo(video)
.then(status=>{
    if(status){ //status tells me that everything has been loaded
        navigator.getUserMedia({video: {}}, 
            stream =>{//here i pass the web cam video through the stream to video
            video.srcObject = stream;//returns the object which serves as the source of the media associated with the HTMLMediaElement
            setInterval(runDetection,1000);
        },
        err => console.log(err)
        );
    }
});
function runDetection(){
  model.detect(video).then(predictions => {
    console.log(predictions);
    if(predictions.length > 0){
        audio.play();
    }
    // model.renderPredictions(predictions, canvas, context, video);
  }); 
}
handTrack.load(modelParams).then(lmodel=>{
    model = lmodel
});