var imported = document.createElement('script');
imported.src = './JS/Arrow.js';
document.head.appendChild(imported);
class Game{
  constructor(canvas){
    this.canvas = canvas;
    this.pullBow = this.pullBow.bind(this);
    this.ctx = canvas.getContext('2d');
    this.loadSprites();
    this.setupGame();
    this.drawGame();
    this.writeStats();
    canvas.addEventListener("mousedown", this.startBow.bind(this), false);
    canvas.addEventListener ("mouseout", this.removeEvent.bind(this), false);
    canvas.addEventListener("mouseup", this.releaseBow.bind(this), false);
    this.startGame();
  }

  startGame(){
    this.pause = false;
    this.gameLoop();
  }


  gameLoop(){
    if(!this.pause){

    }
    this.drawGame();
    this.writeStats();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

removeArrow(arrow){
  var index = this.arrowList.indexOf(arrow);
  if (index > -1) {
    this.arrowList.splice(index, 1);
    console.log("removed arrow");
  }
}


shootBow(){
  let ax = 70 - this.xoff;
  let ay = 210 - this.yoff;
  let arrow = new Arrow(this.canvas,this.ctx,70,210,ax,ay);
  arrow.remove = this.removeArrow.bind(this);
  this.arrowList.push(arrow);
}

drawArrow(){
  for(let i = 0; i < this.arrowList.length; i++){
    let arrow = this.arrowList[i];
    arrow.drawArrow();
  }
}

removeEvent(){
  if(this.attached){
    this.attached = false
    this.canvas.removeEventListener("mousemove", this.pullBow, false);
  }
}


releaseBow(event){
  this.shootBow();
  this.canvas.removeEventListener("mousemove", this.pullBow, false);
  this.attached = false;
}
pullBow(event){
  let x = event.x;
  let y = event.y;
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  this.xoff = this.x - x;
  this.yoff = this.y - y;
}

startBow(event){
  this.attached = true;
  this.x = event.x;
  this.y = event.y;
  this.x -= canvas.offsetLeft;
  this.y -= canvas.offsetTop;
  this.xoff = 0;
  this.yoff = 0;
  this.canvas.addEventListener("mousemove", this.pullBow, false);
 }


  setupGame(){
    this.wave = 0;
    this.points = 0;
    this.arrowList = [];
  }

  loadSprites(){
    this.background = document.getElementById("background");
  }

  drawGame(){
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
    if(this.attached){
      this.ctx.beginPath();
      this.ctx.moveTo(70, 210);
      this.ctx.lineTo(70 - this.xoff, 210 - this.yoff);
      this.ctx.stroke();
    }
    this.drawArrow();
  }
  writeStats(){
    this.ctx.font = "30px Arial";
    this.ctx.textAlign ="center";
    this.ctx.fillText("Wave: " + this.wave, Math.floor(this.canvas.width/2), 35);
  }
}
