class Monster{
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.health = 100;
    this.x = this.canvas.width -50;
    this.y = this.canvas.height -50 - 100;
    this.counter = 0;
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

  attack(){
    if(++this.counter  % 40 == 0){
      this.counter = 0;
      this.damage(5);
      //attack animation
    }
  }

  draw(){
    this.ctx.fillStyle ="black";
    this.ctx.fillRect(this.x,this.y, 50, 100);
  }
}
