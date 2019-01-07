class Monster{
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.health = 100;
    this.x = this.canvas.width -50;
    this.y = this.canvas.height -50 - 100;
    this.counter = 0;
    this.animationStep =0;
    this.spacer = 5;
    this.animationCounter = 0;
    this.isDead = false;
    this.img = document.getElementById('knight');
    this.cutSprite();
  }

  tick(){
    this.move();
  }

  move(){
    if(this.x > 135){
      this.x -= 1.5;
    }else{
      this.attack();
    }
  }
  hurt(amt){
    this.health -= amt;
    if(this.health < 0){
      this.remove(this);
    }
  }
  attack(){
    console.log()
    if(++this.counter  % 40 == 0){
      this.counter = 0;
      this.damage(5);
      //attack animation
    }
  }
  cutSprite(){
    this.spriteList = [];
    let sx = this.img.width-50;
    let sy = 0;
    let sw = 30;
    let sh = 75;
    let cords = {sx: sx, sy: sy, sw: sw, sh: sh};
    this.spriteList.push(cords);
    sx = this.img.width-85;
    cords = {sx: sx, sy: sy, sw: sw, sh: sh};
    this.spriteList.push(cords);
    sx = this.img.width-120;
    cords = {sx: sx, sy: sy, sw: sw, sh: sh};
    this.spriteList.push(cords);
    sx = this.img.width-155;
    cords = {sx: sx, sy: sy, sw: sw, sh: sh};
    this.spriteList.push(cords);
    //attacking
    sx = this.img.width-205;
    sw = 40;
    cords = {sx: sx, sy: sy, sw: sw, sh: sh};
    this.spriteList.push(cords);
    sx = this.img.width-245;
    sw = 40;
    cords = {sx: sx, sy: sy, sw: sw, sh: sh};
    this.spriteList.push(cords);
    sx = this.img.width-50;
    sw = 30;
    cords = {sx: sx, sy: sy, sw: sw, sh: sh};
    this.spriteList.push(cords);

  }
  draw(){
    if(this.animationCounter++ %this.spacer == 0){
      if(++this.animationStep == 4){
        if(this.x > 135){
          this.animationStep = 0;
        }else{
          this.spacer = 20;
        }
      }else if(this.animationStep == 7){
        this.animationStep = 4;
      }else if(this.x <= 135 && this.animationStep < 4){
        this.animationStep =3;
      }
    }
    this.cords = this.spriteList[this.animationStep];
    this.ctx.drawImage(this.img,this.cords.sx,this.cords.sy,this.cords.sw,this.cords.sh,this.x+10,this.y,this.cords.sw,75);
    //health bar
    this.ctx.strokeRect(this.x,this.y-10,50,10);
    let amt = this.health/100;
    amt *= 50;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x+1,this.y-9,amt-2,8);
  }
}
