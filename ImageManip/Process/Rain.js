class Rain{
  constructor(){
    this.rowIndex = 0;
  }
  init(){
    this.size = 25;
  }
  process(callback){
    if(this.rowIndex < this.pixelArray.length){
      this.makeRain();
    }else{
        callback();
        return true;
    }
    callback();
    this.rowIndex+=(this.size/5);
  }

  makeRain(){
    this.counter = 0;
    let ri = this.rowIndex;
    for(let col = 0; col < this.pixelArray[this.rowIndex].length; col++){

      let arr = this.getColArr(this.rowIndex, col, this.size);
      let temparr = [];
      for(let i = 0; i < arr.length; i++){
        if(!this.shouldStay(arr[i])){
          let p = arr[i];
          p.val = this.getValue(p);
          temparr.push(p);
          arr[i] = null;
        }
      }

      temparr = this.bubbleSort(temparr);

      for(let i =0; i < arr.length; i++){
        if(arr[i] === null){
          arr[i] = temparr.shift();
        }
      }

      if(++this.counter % 2 ===0 ){
        arr.reverse();
      }

      this.setColArr(this.rowIndex, col, arr);
    }
    this.rowIndex = ri;
  }
  getColArr(row, col, size){
    let arr = [];
    for(let r = row; (r < row + size) && (r > 0); r++){
      if(r < this.pixelArray.length){
        arr.push(this.pixelArray[r][col]);
      }else{
        break;
      }
    }
    return arr;
  }
  setColArr(row,col, arr){
    let size = arr.length;
    for(let r = row; r < row + size; r++){
      this.pixelArray[r][col] = arr.shift();
    }
  }
  getValue(obj){
    return obj.red - obj.blue - obj.green;
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
