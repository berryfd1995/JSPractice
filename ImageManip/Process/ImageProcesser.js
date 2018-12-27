
var imported = document.createElement('script');
imported.src = './Process/Spiral.js';
document.head.appendChild(imported);
var imported = document.createElement('script');
imported.src = './Process/Blend.js';
document.head.appendChild(imported);
class ImageProcesser{
  constructor(ocanvas, pcanvas,img){
    this.ocanvas = ocanvas;
    this.octx = ocanvas.getContext("2d");
    this.pcanvas = pcanvas;
    this.pctx = pcanvas.getContext("2d");
    this.img = img;
    this.processClass = new Blend();
    this.setFPS(5);
    this.octx.drawImage(this.img,0,0);
    this.pctx.drawImage(this.img,0,0);
  }
  process(){
    //this.fitImageOn(this.ocanvas, this.octx, this.img);
    this.imgData = this.pctx.getImageData(0,0,this.pcanvas.width, this.pcanvas.height);
    this.frameCounter = 0;
    this.keepProcessing = true;
    this.pixelArray = this.getPixelArray(this.imgData);
    this.processClass.setPixelArray(this.pixelArray);
    this.processClass.setImgData(this.imgData);
    //this.start(imgData,0);
    this.startProcess();
  }

async startProcess(){
  if(this.keepProcessing){
    if(++this.frameCounter % this.fps == 0){
      this.frameCounter = 0;
      console.log("Called process");
      await this.processClass.process(this.updateImgData.bind(this), this.endProcess.bind(this));
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
      this.processClass = new Sprial();
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

getPixelArray(imgData){
  let parr = [];
  for(let row = 0; row < this.pcanvas.height; row++){
    let rowArr = [];
    for(let column = 0; column < this.pcanvas.width*4; column+= 4){
      let i = (row*(this.pcanvas.width*4)) + column;
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
samePixelData(pixel, index){
  return(pixel.red === this.imgData.data[index]
    && pixel.green === this.imgData.data[index+1]
    && pixel.blue === this.imgData.data[index+2]
    && pixel.alpha === this.imgData.data[index+3]);
}
updateImgData(){
  //make changes to imgdata.data array
  console.log(this.pixelArray);

  for(let i = 0; i < this.pixelArray.length; i++){
    for(let j = 0; j < this.pixelArray[i].length; j++){
      let index = (i*(this.pixelArray[i].length))+(j*4);
      let pixel = this.pixelArray[i][j];
      if(!this.samePixelData(pixel, index)){
        this.imgData.data[index] = this.pixelArray[i][j].red;
        this.imgData.data[index+1] =this.pixelArray[i][j].green;
        this.imgData.data[index+2] =this.pixelArray[i][j].blue;
        this.imgData.data[index+3] =this.pixelArray[i][j].alpha;
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
