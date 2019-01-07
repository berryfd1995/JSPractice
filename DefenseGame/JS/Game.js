var imported = document.createElement('script');
imported.src = './JS/Arrow.js';
document.head.appendChild(imported);
var imported = document.createElement('script');
imported.src = './JS/Monster.js';
document.head.appendChild(imported);
class Game{
  constructor(canvas){
    this.canvas = canvas;
    this.pullBow = this.pullBow.bind(this);
    this.inProgress = false;
    this.ctx = canvas.getContext('2d');
    this.loadSprites();
    this.setupGame();
    this.drawGame();
    this.writeStats();
    canvas.addEventListener("mousedown", this.startBow.bind(this), false);
    canvas.addEventListener ("mouseout", this.removeEvent.bind(this), false);
    canvas.addEventListener("mouseup", this.releaseBow.bind(this), false);
  }

  startGame(){
    if(!this.inProgress){
      console.log("called");
      this.pause = false;
      this.fpscounter = 0;
      this.maxMonsters = 1;
      this.maxAlive = 1;
      this.currentMonsters = 0;
      this.totalSpawned = 0;
      this.intermission = false;
      this.ended = false;
      this.gameLoop();
    }
  }
  /*===========================Setup ==============================*/
  setupGame(){
    this.wave = 0;
    this.points = 0;
    this.health = 250;
    this.arrowList = [];
    this.monsterList =[];
    var d = new Date();
    var n = d.getTime();
    this.nextSpawnTime = n;
  }

  loadSprites(){
    this.background = document.getElementById("background");
  }
  /*===========================Core ==============================*/

  gameLoop(){
    if(++this.fpscounter % 5 == 0){
      this.fpscounter = 0;
      if(!this.pause){
        this.startWave();
      }
      this.drawGame();
      this.writeStats();
    }
    if(!this.ended){
      requestAnimationFrame(this.gameLoop.bind(this));
      this.ended = false;
    }
  }

  startWave(){
    if(!this.inProgress && !this.intermission){
        this.wave++;
        this.inProgress = true;
        this.intermission = false;
    }else if(this.inProgress && !this.intermission){
      if(this.currentMonsters < this.maxAlive && this.totalSpawned < this.maxMonsters){
        var d = new Date();
        var n = d.getTime();
        if(n > this.nextSpawnTime){
          this.nextSpawnTime = n + 4000;
          this.spawnMonster();
        }
      }else if(this.totalSpawned == this.maxMonsters && this.currentMonsters == 0){
        this.inProgress = false;
        this.intermission = true;
      }
      for(let i = 0; i < this.monsterList.length; i++){
        let m = this.monsterList[i];
        m.tick();
      }
      this.checkForHits();
    }
  }
  nextRound(){
    if(!this.inProgress && !this.pause){
      this.inProgress = false;
      this.intermission = false;
      this.maxMonsters *=2;
      this.totalSpawned = 0;
      this.maxAlive++;
    }
  }
  spawnMonster(){
    this.currentMonsters++;
    this.totalSpawned++;
    let monster = new Monster(this.canvas, this.ctx);
    monster.remove = this.removeMonster.bind(this);
    monster.damage = this.attackTower.bind(this);
    this.monsterList.push(monster);
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  attackTower(amt){
    this.health -= amt;
    if(this.health < 0){
      this.setupGame();
      this.ended = true;
      this.inProgress = false;
      this.intermission = false;
      this.pause = false;
      this.currentMonsters = 0
    }
  }
  checkForHits(){
    for(let i =0; i < this.arrowList.length; i++){
      let arrow = this.arrowList[i];
      if(!arrow.outOfBounds){
        for(let j = 0; j < this.monsterList.length; j++){
            let m = this.monsterList[j];
            if(arrow.p2.x > m.x && arrow.p2.x < m.x + 40){
              if(arrow.p2.y > m.y && arrow.p2.y < m.y + 70){
                arrow.outOfBounds = true;
                arrow.removeArrow(100);
                m.hurt(25);
              }
            }
        }
      }
    }
  }
  removeMonster(m){
    var index = this.monsterList.indexOf(m);
    if (index > -1) {
      this.monsterList.splice(index, 1);
      this.currentMonsters--;

    }
  }

  /*===========================Animations==============================*/


  drawGame(){
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
    this.drawAim();
    this.drawArrows();
    this.drawMonseters();
    this.drawHealth();
  }

  drawArrows(){
    for(let i = 0; i < this.arrowList.length; i++){
      let arrow = this.arrowList[i];
      arrow.drawArrow();
    }
  }
  drawMonseters(){
    for(let i = 0; i < this.monsterList.length; i++){
      let m = this.monsterList[i];
      m.draw();
    }
  }
  drawHealth(){
    this.ctx.strokeRect(15,90,110,20);
    let amt = this.health/250;
    amt *= 110;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(16,91,amt-2,18);
    this.ctx.fillStyle = "black";
    this.ctx.font = "12px Arial";
    this.ctx.fillText(this.health + "/250",50, 105);
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

  removeArrow(arrow){
    var index = this.arrowList.indexOf(arrow);
    if (index > -1) {
      this.arrowList.splice(index, 1);
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
}
