var imported = document.createElement('script');
imported.src = './Process/ImageProcesser.js';
document.head.appendChild(imported);


var imgCanvas;
var processedCanvas;
var imgProcessor;
var img;
window.onload = function() {
  //init

};
window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          img = document.querySelector('img');  // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src to file url
          //img.onload = processImage(); // optional onload event listener

      }
  });
});

function reset(){
  this.imgProcessor.resetImg();
}
function setProcessMode(p){
  this.imgProcessor.setProcessMode(p);
  imgProcessor.process();
}
function processImage(){
  imgCanvas = document.getElementById('origin');
  processedCanvas = document.getElementById('remake');
  imgProcessor = new ImageProcesser(imgCanvas, processedCanvas,img);
  imgProcessor.setProcessMode(4);
  imgProcessor.process();
}
