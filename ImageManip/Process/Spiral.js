class Spiral{
  constructor(){
    this.index = 0;
  }
  init(){
    this.inc = 0;
    this.rotateAmount = this.pixelArray.length/2;
    //this.rotateAmount = 5;
  }
  process(callback){
    if(this.index < this.pixelArray.length/2 && this.index < this.pixelArray[this.index].length){
      this.spiral();
    }else{
      callback();
      return true;
    }
    callback();
    this.index++;
  }
  spiral(){
    //Get rows and columns
    let topArr = this.pixelArray[this.index];
    let leftArr = this.getSideArray(this.index);
    let bottomArr = this.pixelArray[(this.pixelArray.length-1)-this.index];
    let rightArr = this.getSideArray((this.pixelArray[0].length-1)-this.index);
    //[a][-][b] -- [b][-][c] -- [c][-][d] -- [d][-][a]

    let fullArr = [];
    fullArr.push(topArr);
    fullArr.push(leftArr);
    fullArr.push(bottomArr);
    fullArr.push(rightArr);

    fullArr = this.rotateSquare(fullArr, this.rotateAmount);

    //Set rows and columns
    this.pixelArray[this.index] = fullArr.shift();
    this.setSideArray(this.index, fullArr.shift());
    this.pixelArray[(this.pixelArray.length-1)-this.index] = fullArr.shift();
    this.setSideArray((this.pixelArray[0].length-1)-this.index, fullArr.shift());
    this.inc++;
    if(this.inc % 2 ==0){
      this.inc *= -1;
    }
    this.rotateAmount -= this.inc;
  }

  rotateSquare(arr, amt){
    /*                              <---
                               [?][X][?][X][?]
      [X][d][->][a][X]       | [X][a][-][d][X] /\
      [X][a][->][b][X]   __  | [?][-][X][-][?] |
      [X][b][->][c][X]   __ \/ [X][b][-][c][X] |
      [X][c][->][d][X]         [?][X][?][X][?]
                                  --->
    */
    arr[0].reverse();
    arr[3].reverse();
    for(let shiftAmt = 0; shiftAmt < amt; shiftAmt++){
      let lastPixel = null;
      for(let row = 0; row < arr.length; row++){
        for(let column = this.index; column < arr[row].length-this.index; column++){
          let temp = arr[row][column];
          arr[row][column] = lastPixel;
          lastPixel = temp;
          if(row === arr.length-1 && column === ((arr[row].length-1)-this.index)){
            //last row last column
            arr[0][this.index] = lastPixel;
          }
        }
      }
    }
      arr[0].reverse();
      arr[3].reverse();
    return arr;
  }
  clonePixel(pixel){
    let p = {
      val: pixel.val,
      red: pixel.red,
      green: pixel.green,
      blue: pixel.blue
    };
    return p;
  }
  getSideArray(index){
    let arr = [];
    for(let row = 0; row < this.pixelArray.length; row++){
      arr.push(this.pixelArray[row][index]);
    }
    return arr;
  }
  setSideArray(index, arr){
    for(let row = 0; row < this.pixelArray.length; row++){
      this.pixelArray[row][index] = arr.shift();
    }
  }
}
