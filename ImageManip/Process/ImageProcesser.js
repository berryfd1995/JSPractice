
var imported = document.createElement('script');
imported.src = './Spiral.js';
document.head.appendChild(imported);
var imported = document.createElement('script');
imported.src = './Blend.js';
document.head.appendChild(imported);
class ImageProcesser{
  constructor(ocanvas, pcanvas,img){
    this.ocanvas = ocanvas;
    this.octx = ocanvas.getContext("2d");
    this.pcanvas = pcanvas;
    this.pctx = pcanvas.getContext("2d");
    this.img = img;
    this.processClass = new Blend();
  }
  process(){
    //this.fitImageOn(this.ocanvas, this.octx, this.img);
    this.octx.drawImage(this.img,0,0);
    this.pctx.drawImage(this.img,0,0);
    this.imgData = this.pctx.getImageData(0,0,this.pcanvas.width, this.pcanvas.height);
    this.frameCounter = 0;
    this.keepProcessing = true;
    this.pixelArray = getPixelArray(imgData);
    this.processClass.setPixelArray(pixelArray);
    this.processClass.setImgData(imgData);
    //this.start(imgData,0);
    this.startProcess(]);
  }

startProcess(){
  if(this.keepProcessing){
    if(++this.frameCounter % this.fps == 0){
      this.frameCounter = 0;
      await this.processClass.process(this.updateImgData);
    }
    requestAnimationFrame(function(){
      this.startProcess();
    }.bind(this));
  }
}
setProcessMode(modes){
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
    for(let column = 0; column < this.pcanvas.width*4; column+= 4){
      let i = row*(this.pcanvas.width*4) + column;
      let pixel = {
        val: 0,
        red: imgData.data[i],
        green: imgData.data[i+1],
        blue: imgData.data[i+2],
        alpha: imgData.data[i+3],
      };
      //push to array
    }
  }
    //create object with value

    parr.push(pixel);
  }
  return parr;
}
updateImgData(){
  //make changes to imgdata.data array
  for(let i = 0; i < .length; i++){
    let index = sIndex+(i*4);
    imgData.data[index] = parr[i].red;
    imgData.data[index+1] =parr[i].green;
    imgData.data[index+2] =parr[i].blue;
    imgData.data[index+3] =parr[i].alpha;
  }

  this.pctx.putImageData(imgData, 0, 0);
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
