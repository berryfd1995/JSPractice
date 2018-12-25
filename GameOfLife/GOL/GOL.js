class GOL{
  constructor(canvas,info){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvasHeight =canvas.height;
    this.canvasWidth = canvas.width;
    this.boxHeight = 20;
    this.boxWidth = 20;
    this.fps = 10;
    this.pause = false;
    this.generation = 0;
    this.world = [[]];
    this.copy = [[]];
    this.aliveCells = 0;
  }
  createNewGame(width, height){
    this.aliveCells = 0;
    this.generation = 0;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    //set dimensions
    this.boxWidth = width;
    this.boxHeight = height;
    //create world
    this.world =new Array(this.canvasHeight/height).fill(0).map(() => new Array(this.canvasWidth/width).fill(0));
    this.copy = new Array(this.canvasHeight/height).fill(0).map(() => new Array(this.canvasWidth/width).fill(0));
    //Draw the board, and create live cells based on random
    for(let i = 0; i < this.canvasWidth; i+=width){
      for(let j = 0; j < this.canvasHeight; j+=height){
        var alive = Math.random() >= 0.5;
        if(alive){
          this.world[i/this.boxWidth][j/this.boxHeight] = 1;
          this.aliveCells++;
          this.ctx.fillStyle = "gray";
          this.ctx.fillRect(i,j,this.boxWidth, this.boxHeight);
        }else{
          this.world[i/this.boxWidth][j/this.boxHeight] =0;
          this.ctx.strokeRect(i, j, this.boxWidth, this.boxHeight);
        }
      }
    }
    this.ctx.stroke();
  }
  pauseG(){
    this.pause = true;
  }
  start(){
    this.pause = false;
    this.frameCounter = 0;
    this.gameLoop();
  }
  gameLoop(){
    if(!this.pause){
      if(++this.frameCounter % this.fps == 0){
        this.frameCounter = 0;
        this.applyGeneration();
      }
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  setFPS(fps){
    this.fps = Math.floor(60/fps);
  }
  setSize(dimension){

  }
  applyGeneration(){
      this.aliveCells = 0;
      for(let row = 0; row < this.world.length; row++){
        for(let column = 0; column < this.world[0].length; column++){
          if(this.shouldLive(row,column)){
            this.copy[row][column] = 1;
            this.aliveCells++;
          }else{
            this.copy[row][column] = 0;
          }
        }
      }
      this.world = this.copyArray(this.copy);
      this.generation++;
      this.drawBoard();
    }

 drawBoard(){
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for(let i = 0; i < this.canvasHeight; i+=this.boxHeight){
      for(let j = 0; j < this.canvasWidth; j+=this.boxWidth){
        let row = i/this.boxHeight;
        let column = j/this.boxWidth;
        if(this.world[row][column] === 1){
          this.ctx.fillStyle = "gray";
          this.ctx.fillRect(i,j,this.boxWidth, this.boxHeight);
        }else{
          this.ctx.strokeRect(i,j,this.boxWidth, this.boxHeight);
        }
      }
    }
    this.ctx.stroke();
    document.getElementById("info").innerHTML = this.getInfo();
  }


  getInfo(){
    let s = "Generations: " + this.generation;
    s += "\nAlive Cells: " + this.aliveCells;
    return s
  }


  shouldLive(row, column){
    let neighbors = this.getAliveNeighbors(row,column);
    let cell = this.world[row][column];
    if(cell === 1){
      neighbors--;
    }
    if(cell === 1){
      if(neighbors < 2){
        return false;
      }else if(neighbors >1 && neighbors <4){
        return true;
      }else{
        return false;
      }
    }else{
      if(neighbors === 3){
        return true;
      }else{
        return false;
      }
    }
  }


  getAliveNeighbors(row, column){
    let amt = 0;
    for(let i = -1; i < 2; i++){
      for(let j = -1; j < 2; j++){
        let tempRow = (row + i + this.world.length) % this.world.length;
        let tempCol = (column + j + this.world[0].length) % this.world[0].length;
        if(this.world[tempRow][tempCol] === 1){
          amt++;
        }
      }
    }
    return amt;
  }

  copyArray(arr){
    let arrCopy =new Array(arr.length).fill(0).map(() => new Array(arr[0].length).fill(0));
    for(let row = 0; row < arr.length; row++){
      for(let col = 0; col < arr[0].length; col++){
        if(arr[row][col] === 1){
          arrCopy[row][col] = 1;
        }else{
          arrCopy[row][col] = 0;
        }
      }
    }
    return arrCopy;
  }
}
