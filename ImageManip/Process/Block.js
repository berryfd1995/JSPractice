class Block{
  constructor(){
    this.bEdge = 50;
    this.row = 0;
  }
  init(){

  }
  process(callback){
    if(this.row >= this.pixelArray.length){
      return true;
    }
    for(let c = 0; c < this.pixelArray[this.row].length; c+= this.bEdge){
      let grid = this.getGrid(this.row, c);
      let pixel = this.getAverage(grid);
      this.applyPixelToGrid(this.row, c, pixel);
    }
    callback();
    this.row+= this.bEdge;
  }
  getGrid(row, column){
    let arr = [];
    for(let r = 0; r < this.bEdge; r++){
      let rArr = [];
      for(let c = 0; c < this.bEdge; c++){
        if(row+r < this.pixelArray.length && column+c < this.pixelArray[0].length){
          let pixel = this.pixelArray[row+r][column+c];
          rArr.push(pixel);
        }
      }
      arr.push(rArr);
    }
    return arr;
  }

  applyPixelToGrid(row, column ,p){
    for(let r = 0; r < this.bEdge; r++){
      let rArr = [];
      for(let c = 0; c < this.bEdge; c++){
        if(row+r < this.pixelArray.length && column+c < this.pixelArray[0].length){
          this.pixelArray[row+r][column+c] = p;
        }
      }
    }
  }

  getAverage(grid){
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0;
    for(let row = 0; row < grid.length; row++){
      for(let c = 0; c < grid[row].length; c++){
        let pixel = grid[row][c];
        r += pixel.red;
        g += pixel.green;
        b += pixel.blue;
        a += pixel.alpha;
      }
    }
    let c = grid.length * grid[0].length;
    r = Math.floor(r / c);
    g = Math.floor(g/c);
    b = Math.floor(b/c);
    a = Math.floor(a/c);
    let pixel = {
      red: r,
      green: g,
      blue: b,
      alpha: a,
      val: 0
    };
    return pixel;
  }
}
