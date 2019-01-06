class Game{
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.loadSprites();
    this.setupGame();
    this.drawGame();
    this.writeStats();
    canvas.addEventListener("mousedown", this.startBow.bind(this), false);

    canvas.addEventListener("mouseup", this.releaseBow.bind(this), false);
  }

  startGame(){
    this.pause = false;
    this.gameLoop();
  }


  gameLoop(){
    if(!this.pause){

    }
    this.drawBoard();
    this.writeStats();
    requestAnimationFrame(this.gameloop.bind(this));
  }
















releaseBow(event){
  let x = event.x;
  let y = event.y;
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  console.log("x:" + x + " y:" + y);
  let xoff = this.x - x;
  let yoff = this.y - y;
  console.log("xOff:" + xoff + " yOff:" + yoff);
  this.canvas.removeEventListener("mousemove", this.pullBow, false);
}
pullBow(event){
  let x = event.x;
  let y = event.y;
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  console.log("px:" + x + " py:" + y);
  let xoff = this.x - x;
  let yoff = this.y - y;
  console.log("xOff:" + xoff + " yOff:" + yoff);
}

startBow(event){
  this.x = event.x;
  this.y = event.y;
  this.x -= canvas.offsetLeft;
  this.y -= canvas.offsetTop;
  console.log("x:" + this.x + " y:" + this.y);
  this.canvas.addEventListener("mousemove", this.pullBo w, false);
 }


  setupGame(){
    this.wave = 0;
    this.points = 0;
  }
  loadSprites(){
    this.background = document.getElementById("background");
  }

  drawGame(){
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

  }
  writeStats(){
    this.ctx.font = "30px Arial";
    this.ctx.textAlign ="center";
    this.ctx.fillText("Wave: " + this.wave, Math.floor(this.canvas.width/2), 35);
  }
}
