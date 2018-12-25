
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
          img.onload = processImage(); // optional onload event listener
      }
  });
});

function processImage(){
  imgCanvas = document.getElementById('origin');
  processedCanvas = document.getElementById('remake');
  imgProcessor = new ImageProcesser(imgCanvas, processedCanvas,img);
  imgProcessor.process();
}



//Class
class ImageProcesser{
  constructor(ocanvas, pcanvas,img){
    this.ocanvas = ocanvas;
    this.octx = ocanvas.getContext("2d");
    this.pcanvas = pcanvas;
    this.pctx = pcanvas.getContext("2d");
    this.img = img;
  }
  process(){
    //this.fitImageOn(this.ocanvas, this.octx, this.img);
    this.octx.drawImage(this.img,0,0);
    this.pctx.drawImage(this.img,0,0);
    var imgData = this.pctx.getImageData(0,0,this.pcanvas.width, this.pcanvas.height);
    this.frameCounter = 0;
    this.start(imgData,0);

  }


  /*
    pixel = {
      val = #;
      pixel1 = 0-255
      pixel2 = 0-255
      pixel3 = 0-255
      pixel4 = 0-255
  }
  */
  async start(imgData, row){
    if(row < imgData.height){
      if(++this.frameCounter % 1 == 0){
          this.frameCounter = 0;
          await this.sortImagePixels(imgData, row);
          row++;
        }
      requestAnimationFrame(function(){
        this.start(imgData,row);
      }.bind(this));
    }else{
      console.log("finished");
    }
  }



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
      for(let i = 0; i < parr.length; i++){
        let index = sIndex+(i*4);
        imgData.data[index] = parr[i].red;
        imgData.data[index+1] =parr[i].green;
        imgData.data[index+2] =parr[i].blue;
        imgData.data[index+3] =parr[i].alpha;
      }

      this.pctx.putImageData(imgData, 0, 0);
  }



  blend(arr){
    let temp = new Array(arr.length);
    let sort = [];
    for(let index = 0; index < arr.length; index++){
      let pixel = arr[index];
      if(this.shouldStay(pixel)){
        temp[index] = pixel;
      }else{
        temp[index] = null;
        pixel.val = this.getValue(pixel);
        sort.push(pixel);
      }
    }
    //original
    //sort = this.bubbleSort(sort);

    //diff
    let left = sort.slice(0, sort.length/2);
    let right = sort.slice((sort.length/2));
    left = this.bubbleSort(left);
    left.reverse();
    right = this.bubbleSort(right);
    sort = left.concat(right);
    for(let index = 0; index < temp.length; index++){
      if(temp[index] === null || temp[index] === undefined){
        temp[index] = sort.shift();
      }
    }
    return temp;
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

  getValue(obj){
    return obj.red - obj.blue - obj.green;
  }
    getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    shouldStay(pixel){
      if(pixel.red < 100 && pixel.green <  100 && pixel.blue < 100){
        return true;
      }else if(pixel.red > 200 && pixel.green > 200 && pixel.blue > 200){
        return true;
      }else{
        return false;
      }
    }
    rotateArray(arr){
      for(let i = 0; i < arr.length; i++){
        let temp = arr.shift();
        arr.push(temp);
      }
      return arr;
    }
    bubbleSort(arr){
       var len = arr.length;
       for (var i = len-1; i>=0; i--){
         for(var j = 1; j<=i; j++){
           if(arr[j-1].val>arr[j].val){
               var temp = arr[j-1];
               arr[j-1] = arr[j];
               arr[j] = temp;
            }
         }
       }
       return arr;
    }
}
