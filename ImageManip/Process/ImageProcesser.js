
var imported = document.createElement('script');
imported.src = './Process/Spiral.js';
document.head.appendChild(imported);
var imported = document.createElement('script');
imported.src = './Process/Blend.js';
document.head.appendChild(imported);
var imported = document.createElement('script');
imported.src = './Process/Rain.js';
document.head.appendChild(imported);
var imported = document.createElement('script');
imported.src = './Process/Block.js';
document.head.appendChild(imported);
class ImageProcesser{
  constructor(ocanvas, pcanvas,img){
    this.ocanvas = ocanvas;
    this.octx = ocanvas.getContext("2d");
    this.pcanvas = pcanvas;
    this.pctx = pcanvas.getContext("2d");
    this.img = img;
    this.setProcessMode(4);
    this.setFPS(60);
    this.octx.drawImage(this.img,0,0);
    this.pctx.drawImage(this.img,0,0);
  }
  process(){
    //this.fitImageOn(this.ocanvas, this.octx, this.img);
    this.imgData = this.pctx.getImageData(0,0,this.pcanvas.width, this.pcanvas.height);
    this.frameCounter = 0;
    this.keepProcessing = true;
    this.pixelArray = this.getPixelArray(this.imgData);
    this.processClass.pixelArray = this.pixelArray;
    this.processClass.imgData = this.imgData;
    //this.start(imgData,0);
    this.processClass.init();
    this.startProcess();
  }

async startProcess(){
  if(this.keepProcessing){
    if(++this.frameCounter % this.fps == 0){
      this.frameCounter = 0;
      if(await this.processClass.process(this.updateImgData.bind(this), this.endProcess.bind(this))){
        this.endProcess();
      }
    }
    requestAnimationFrame(function(){
      this.startProcess();
    }.bind(this));
  }
}
setProcessMode(mode){
  switch(mode){
    case 1:
      this.processClass = new Blend();
      break;
    case 2:
      this.processClass = new Spiral();
      break;
    case 3:
      this.processClass = new Rain();
      break;
    case 4:
      this.processClass = new Block();
      break;
    default:
      this.processClass = new  Blend();
    break;
  }
}

endProcess(){
  this.keepProcessing = false;
  console.log("Finished processing image");

}

setFPS(fps){
  this.fps = Math.floor(60/fps);
}
samePixelData(pixel, index){
  return(pixel.red === this.imgData.data[index]
    && pixel.green === this.imgData.data[index+1]
    && pixel.blue === this.imgData.data[index+2]
    && pixel.alpha === this.imgData.data[index+3]);
}
getPixelArray(imgData){
  let parr = [];
  for(let row = 0; row < this.pcanvas.height; row++){
    let rowArr = [];
    let rIndex = row*(this.pcanvas.width*4);
    for(let column = 0; column < this.pcanvas.width*4; column+= 4){
      let i = rIndex + column;
      let pixel = {
        val: 0,
        red: imgData.data[i],
        green: imgData.data[i+1],
        blue: imgData.data[i+2],
        alpha: imgData.data[i+3],
      };
      rowArr.push(pixel);
    }
    parr.push(rowArr);
  }
  return parr;
}

updateImgData(){
  //make changes to imgdata.data array
  for(let row = 0; row < this.pixelArray.length; row++){
    let rIndex = row*(this.pixelArray[row].length *4);
    for(let column = 0; column < this.pixelArray[row].length; column++){
      let index = rIndex+(column*4);
      let pixel = this.pixelArray[row][column];
      if(!this.samePixelData(pixel, index)){
        this.imgData.data[index] = pixel.red;
        this.imgData.data[index+1] = pixel.green;
        this.imgData.data[index+2] = pixel.blue;
        this.imgData.data[index+3] = pixel.alpha;
      }
    }
  }
  this.pctx.putImageData(this.imgData, 0, 0);
}

///////////////////////////////////Code below will be deleted at some point///////////////////////////////////////
  /*
    pixel = {
      val = #;
      pixel1 = 0-255
      pixel2 = 0-255
      pixel3 = 0-255
      pixel4 = 0-255
  }
  */



  sortImagePixels(imgData,row){
      //console.log(imgData.data[((500*500)*4)-1])
      let sIndex = (this.pcanvas.width*4)*row;
      //iterate through column on row

      //arry sorted
      let parr = [];
      for(let i = sIndex; i < sIndex+(this.pcanvas.width*4)-1; i+=4){
        //create object with value
        let pixel = {
          val: 0,
          red: imgData.data[i],
          green: imgData.data[i+1],
          blue: imgData.data[i+2],
          alpha: imgData.data[i+3],
        };
        parr.push(pixel);
      }
      //Sort via a certian type
      parr = this.blend(parr);
      //reassign ar

  }
}
