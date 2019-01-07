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
  setupGame(){
    this.wave = 0;
    this.points = 0;
    this.arrowList = [];
  }

  loadSprites(){
    this.background = document.getElementById("background");
  }
  getPower(){
    return 2*Math.sqrt(Math.pow(this.v1,2) + Math.pow(this.v2,2));
  }
  shootBow(){
    let p1 = {x:this.x2, y:this.y2};
    let p2 = {x:70, y:210};
    let arrow = new Arrow(this.canvas,this.ctx,p1,p2);
    arrow.remove = this.removeArrow.bind(this);
    this.arrowList.push(arrow);
    this.v1 =0;
    this.v2 = 0;
    this.x2 = 0;
    this.y2 = 0;
  }
  drawGame(){
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
    this.drawAim();
    this.drawArrows();
  }

  drawArrows(){
    for(let i = 0; i < this.arrowList.length; i++){
      let arrow = this.arrowList[i];
      arrow.drawArrow();
    }
  }

  drawAim(){
    if(this.attached){
      this.ctx.beginPath();
      this.ctx.moveTo(70, 210);
      this.x2 = 70 -this.xoff;
      this.y2 = 210 -this.yoff;
      this.v1 = 70-this.x2;
      this.v2 = 210-this.y2;
      let p = this.getPower();
      if(p > 100){
        p = 1/p;
        this.v1 = p*this.v1;
        this.v2 = p*this.v2;
        this.x2= 70- (100*this.v1);
        this.y2 = 210-(100*this.v2);
      }
      this.ctx.lineTo(this.x2, this.y2);
      this.ctx.stroke();
    }
  }
  writeStats(){
    this.ctx.font = "30px Arial";
    this.ctx.textAlign ="center";
    this.ctx.fillText("Wave: " + this.wave, Math.floor(this.canvas.width/2), 35);
  }


  /*===========================Bow Listeners==============================*/


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
}
