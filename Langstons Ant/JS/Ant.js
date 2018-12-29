class Ant{
  constructor(canvas, ant){
    this.boxWidth = 20;
    this.boxHeight = 20;
    this.pause = false;
    this.frameCounter = 0;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.ant = ant;
    this.setFPS(2000);
    this.createBoard(20,20);
  }

  createBoard(width, height){
    this.aliveCells = 0;
    this.generation = 0;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    //set dimensions
    this.boxWidth = width;
    this.boxHeight = height;
    //create world
    this.world =new Array(this.canvasHeight/height).fill(0).map(() => new Array(this.canvasWidth/width).fill(0));
    this.setAnt();
    this.drawBoard();
  }

  setAnt(){
    //direction: 0 = up, 1 = left; 2 = down; 3 = right
    this.antDirection =0;
    this.antRow = Math.floor((this.canvasHeight/this.boxHeight)/2);
    this.antColumn = Math.floor((this.canvasWidth/this.boxWidth)/2);
  }

  start(){
    this.pause = false;
    this.gameLoop();
  }
  pauseG(){
    this.pause = true;
  }

  setFPS(fps){

    this.rawFPS = fps;
    if(this.rawFPS > 60){
      this.repeat = this.rawFPS/60;
    }
    let frames = fps%60;
    this.fps = Math.floor(60/frames);
  }

  gameLoop(){
    if(!this.pause){
      if(++this.frameCounter % this.fps == 0){
        this.frameCounter = 0;
        for(let i = 0; i < this.repeat; i++){
          this.applyGeneration();
        }
      }
      this.drawBoard();
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  applyGeneration(){
    //if cell id white, flip color, move to the right
    if(this.world[this.antRow][this.antColumn] === 0){
      this.world[this.antRow][this.antColumn] = 1;
      this.antDirection = (this.antDirection+3)%4;
    }else{
      this.world[this.antRow][this.antColumn] = 0;
      this.antDirection = (this.antDirection+5)%4;
    }
    this.moveAnt();
  }

  isAntLoc(row, column){
    return (row === this.antRow && column === this.antColumn);
  }
  drawBoard(){
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for(let i = 0; i < this.canvasHeight; i+=this.boxHeight){
      for(let j = 0; j < this.canvasWidth; j+=this.boxWidth){
        let row = i/this.boxHeight;
        let column = j/this.boxWidth;
        if(this.world[row][column] === 1){
          this.ctx.clearRect(j,i,this.boxWidth, this.boxHeight);

        }else{
          this.ctx.fillStyle = "gray";
          this.ctx.fillRect(j,i,this.boxWidth, this.boxHeight);
        }
        if(this.isAntLoc(row,column)){
          this.drawAnt(j,i,this.boxWidth,this.boxHeight);
        }
      }
    }
    this.ctx.stroke();
  }
  drawAnt(x,y,w,h){
    let degrees = this.getDegrees();
    this.ctx.save();
    this.ctx.translate(x+w/2, y+h/2);
    this.ctx.rotate(degrees*Math.PI/180.0);
    this.ctx.translate(-x-w/2, -y-h/2);
    this.ctx.drawImage(this.ant, x, y, w, h);
    this.ctx.restore();
  }

  moveAnt(){
    switch(this.antDirection){
      //up
      case 0:
        this.antRow = (this.antRow - 1 + this.world.length) % this.world.length;
        break;
        //left
      case 1:
        this.antColumn = ((this.antColumn-1) + this.world[0].length) % this.world[0].length;
        break;
      case 2:
        this.antRow = ((this.antRow +1) + this.world.length) % this.world.length;
        break;
      case 3:
        this.antColumn = ((this.antColumn+1) + this.world[0].length) % this.world[0].length;
        break;
    }
  }

  getDegrees(){
    switch(this.antDirection){
      case 0:
        return 0;
      case 1:
        return -90;
      case 2:
        return 180;
      case 3:
        return 90;
      default:
        return 0;
    }
  }
}
