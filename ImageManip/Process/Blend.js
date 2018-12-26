class Blend{
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
