class Sprial{
  constructor(){

  }

  setPixelArray(pixelArray){
    this.pixelArray = pixelArray;
  }
  setImgData(imgData){
    this.imgData = imgData;
  }

  process(callback){

    callback();
  }
  spiral(arr, index){
    //Remember it is 1D. [][][][][][][arr.length/2}][][][][][][] ==
    /*
    [][][][]
    [][][x][][]
    [][][][]
    */
    //rotate from middle or from edge in a square, so 1x1, 2x2, 3x3, 4x4, 5x5 reverse, +- index


  }
}
