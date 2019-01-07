class Snake{
  constructor(canvas,head,body, apple){
    this.canvas = canvas;
    this.head = head;
    this.body = body;
    this.apple = apple;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.ctx = canvas.getContext("2d");
    this.boxWidth = 25;
    this.boxHeight = 5;
    this.setupGame();
  }

  /*
  Rules:
  Snake array cannot have 2 of the same cords
  Snake array cannot be out-of-bounds
  When snake eats apple, push don't pop
  */

  setupGame(){
    this.running = false;
    this.changeDirection = true;
    this.direction = 0;
    this.world =new Array(this.canvasHeight/this.boxHeight).fill(0).map(() => new Array(this.canvasWidth/this.boxWidth).fill(0));
    let sX = Math.floor(this.world.length/2);
    let sY = Math.floor(this.world[0].length/2);
    this.snakeCords = [this.getRawSlot(sX,sY)];
    this.addApple();
    this.drawBoard();
  }

  setDirection(d){
    if(!this.changeDirection){
      return;
    }
    if((this.direction+2)% 2 == 0 && (d+2)%2 == 0){
      return;
    }
    if((this.direction+2) % 2 == 1 && (d+2) % 2 == 1){
      return;
    }
    this.direction = d;
    this.changeDirection = false;
  }
  endGame(){
    this.running = false;
    this.setupGame();
  }
  start(){
    if(!this.running){
      this.frameCounter = 0;
      this.running = true;
      this.gameLoop();
    }
  }

  gameLoop(){
    if(this.running){
      if(++this.frameCounter % 30 == 0){
        this.frameCounter = 0;
        this.moveSnake();
        this.drawBoard();
        this.changeDirection = true;
      }
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }


  moveSnake(){
    let head = this.snakeCords[0];
    let cords = this.getCords(head);
    let sX = cords[0];
    let sY = cords[1];
    let nX = sX;
    let nY = sY;
    //get new cords for head
    switch(this.direction){
      //up
      case 0:
        nY = (sY - 1);
        break;
        //left
      case 1:
        nX = (sX-1);
        break;
      case 2:
        nY = (sY +1);
        break;
      case 3:
        nX = (sX+1);
        break;
    }
    //check bounds
    if(nX < 0 || nX >= this.world[0].length){
      this.endGame();
      return;
    }else if(nY< 0 || nY >= this.world.length){
      this.endGame();
      return;
    }
    //check if apple
    if(this.world[nY][nX] == 1){
      this.snakeCords.unshift(this.getRawSlot(nX,nY));
      this.world[nY][nX] = 0;
      this.addApple();
    }else{
      this.snakeCords.unshift(this.getRawSlot(nX,nY));
      this.snakeCords.pop();
    }
    //check if eating itself
    var duplicates = this.snakeCords.reduce(function(acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
    }, []);
    if(duplicates.length >0){
      this.endGame();
    }
  }

  addApple(){
    let max = this.world.length * this.world[0].length;
    let temp = [];
    for(let i = 0; i < max; i++){
      if(this.snakeCords.indexOf(i) < 0){
        temp.push(i);
      }
    }
    let index = this.getRandomInt(0,temp.length);
    let rawSlot = temp[index];
    let cords = this.getCords(rawSlot);
    this.world[cords[1]][cords[0]] = 1;
  }

  getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  drawBoard(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    for(let i = 0; i < this.canvasHeight; i+=this.boxHeight){
      for(let j = 0; j < this.canvasWidth; j+=this.boxWidth){
        let row = Math.floor(i/this.boxHeight);
        let column = Math.floor(j/this.boxWidth);
        if(this.isSnakeHead(column, row)){
          this.drawHead(j, i, this.boxWidth, this.boxHeight);
        }else if(this.isSnakeBody(column, row)){
          this.ctx.drawImage(this.body,j, i, this.boxWidth, this.boxHeight);
        }else if(this.world[row][column] == 1){
          this.ctx.drawImage(this.apple,j, i, this.boxWidth, this.boxHeight);
        }
      }
    }
    this.ctx.stroke();
  }
  drawHead(x,y,w,h){
    let degrees = this.getDegrees();
    this.ctx.save();
    this.ctx.translate(x+w/2, y+h/2);
    this.ctx.rotate(degrees*Math.PI/180.0);
    this.ctx.translate(-x-w/2, -y-h/2);
    this.ctx.drawImage(this.head, x, y, w, h);
    this.ctx.restore();
  }

  isSnakeHead(x, y){
    let rawSlot = this.getRawSlot(x,y);
    if(this.snakeCords[0] == rawSlot){
      return true;
    }
  }

  isSnakeBody(x,y){
    let rawSlot = this.getRawSlot(x,y);
    for(let index = 1; index < this.snakeCords.length; index++){
      if(this.snakeCords[index] == rawSlot){
        return true;
      }
    }
    return false;
  }


  getRawSlot(x,y){
    let temp = this.world[0].length * y;
    return x+temp;
  }

  getCords(slot){
    let y = Math.floor(slot/this.world[0].length);
    let x = slot%this.world[0].length;
    return [x, y];
  }

  getDegrees(){
    switch(this.direction){
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
